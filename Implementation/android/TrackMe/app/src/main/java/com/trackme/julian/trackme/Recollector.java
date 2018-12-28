package com.trackme.julian.trackme;

import android.Manifest;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.IOException;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class Recollector extends AppCompatActivity {

    TextView mensaje1;
    TextView mensaje2;
    TextView mensaje3;

    TextView last_record;

    Boolean control;

    TimerTask task;

    Calendar c;
    SimpleDateFormat dateformat;

    int danger_HearthRate;
    int counter_HearthRate = 0;
    int control_HearthRate = 55;

    private NotificationCompat.Builder mBuilder;

    Handler mHandler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.recollector);

        mensaje1 = (TextView) findViewById(R.id.mensaje_id);
        mensaje2 = (TextView) findViewById(R.id.mensaje_id2);
        mensaje3 = (TextView) findViewById(R.id.mensaje_id3);

        control = false;

        final Button changeScreen = findViewById(R.id.button_change);

        changeScreen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setContentView(R.layout.principal_screen);

                last_record = (TextView) findViewById(R.id.last_record);

                control = true;
            }
        });

        int icono = R.drawable.logomini;
        Intent intent = new Intent(Recollector.this, Recollector.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(Recollector.this, 0, intent, 0);

        mBuilder = new NotificationCompat.Builder(getApplicationContext(), "GPSNotification")
                .setContentIntent(pendingIntent)
                .setSmallIcon(icono)
                .setContentTitle("TrackMe")
                .setVibrate(new long[]{100, 250, 100, 500})
                .setAutoCancel(true);

        mHandler = new Handler();

        if (ActivityCompat.checkSelfPermission(Recollector.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(Recollector.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,}, 1000);
        } else {
            locationStart();
        }
    }

    private void locationStart() {

        final LocationManager mlocManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        final Localizacion Local = new Localizacion();

        dateformat = new SimpleDateFormat("hh:mm:ss");

        Local.setMainActivity(this);

        Timer timer = new Timer();

        final NotificationManager mNotifyMgr = (NotificationManager) getApplicationContext().getSystemService(NOTIFICATION_SERVICE);

        danger_HearthRate = (int) (Math.random() * 10) + 5;

        final boolean gpsEnabled = mlocManager.isProviderEnabled(LocationManager.GPS_PROVIDER);

        if (!gpsEnabled) {
            Intent settingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            startActivity(settingsIntent);
        }
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,}, 1000);
            return;
        }

        mlocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, (LocationListener) Local);
        mlocManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, (LocationListener) Local);
        if(control == false) {
            mensaje1.setText("Localización agregada");
            mensaje2.setText("");
            mensaje3.setText("");
        }

        task = new TimerTask() {
            @Override
            public void run() {
                GPS(mNotifyMgr, mlocManager);
            }
        };

        timer.schedule(task, 1, 30000);
    }

    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == 1000) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                locationStart();
                return;
            }
        }
    }

    public void setLocation(Location loc) {
        //Obtener la direccion de la calle a partir de la latitud y la longitud
        if (loc.getLatitude() != 0.0 && loc.getLongitude() != 0.0) {
            try {
                Geocoder geocoder = new Geocoder(this, Locale.getDefault());
                List<Address> list = geocoder.getFromLocation(
                        loc.getLatitude(), loc.getLongitude(), 1);
                if (!list.isEmpty()) {
                    final Address DirCalle = list.get(0);

                    if (control == false) {
                        mHandler.post(new Runnable() {
                            @Override
                            public void run() {
                                mensaje2.setText("Mi direccion es: \n"
                                        + DirCalle.getAddressLine(0));
                            }
                        });
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void GPS(NotificationManager mNotifyMgr, LocationManager mlocManager) {

        final Location loc;

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        loc = mlocManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

        try {
            loc.getLatitude();
            loc.getLongitude();

            c = Calendar.getInstance();

            String dateTime = dateformat.format(c.getTime());

            mBuilder.setContentText("Trackeo GPS realizado: " + dateTime);

            mNotifyMgr.notify(1, mBuilder.build());

            final String Text = "Mi ubicacion actual es: " + "\n Lat = "
                    + loc.getLatitude() + "\n Long = " + loc.getLongitude();

            final String TextLastRecord = "Last record: " + dateTime;

            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    if(control == false) {
                        mensaje1.setText(Text);
                    }
                    else {
                        last_record.setText(TextLastRecord);
                    }
                }
            });

            setLocation(loc);

            Hearth_Rate(mNotifyMgr);

        }
        catch (NullPointerException e) {

            final String Text = "No ha sido posible establecer la ubicacion";

            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    mensaje1.setText(Text);
                }
            });

        }
    }

    public void Hearth_Rate (NotificationManager mNotifyMgr) {

        int number;
        int counter = 0;

        final int number_text;

        do {
            number = (int) (Math.random() * 55 + 55);
            counter = counter + 1;
        } while ((number < (control_HearthRate + 15) || number > (control_HearthRate - 15)) && counter != 5);

        if(counter_HearthRate < danger_HearthRate) {

            number_text = number;

            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    mensaje3.setText("Hearth rate: " + number_text + " bpm");
                    counter_HearthRate = counter_HearthRate + 1;
                }
            });
        }
        else {

            number_text = number - 55;

            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    mensaje3.setText("Danger! Hearth rate very low: " + number_text + " bpm");
                    counter_HearthRate = 0;
                }
            });
            mBuilder.setContentText("DANGER! Hearth rate very low");

            mNotifyMgr.notify(1, mBuilder.build());
        }
    }

    /* Aqui empieza la Clase Localizacion */
    public class Localizacion implements LocationListener {
        Recollector mainActivity;

        public Recollector getMainActivity() {
            return mainActivity;
        }
        public void setMainActivity(Recollector mainActivity) {
            this.mainActivity = mainActivity;
        }

        @Override
        public void onLocationChanged(Location loc) {
            // Este metodo se ejecuta cada vez que el GPS recibe nuevas coordenadas
            // debido a la deteccion de un cambio de ubicacion
        }

        @Override
        public void onProviderDisabled(String provider) {
            // Este metodo se ejecuta cuando el GPS es desactivado
            mensaje1.setText("GPS Desactivado");
        }
        @Override
        public void onProviderEnabled(String provider) {
            // Este metodo se ejecuta cuando el GPS es activado
            mensaje1.setText("GPS Activado");
        }
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            switch (status) {
                case LocationProvider.AVAILABLE:
                    Log.d("debug", "LocationProvider.AVAILABLE");
                    break;
                case LocationProvider.OUT_OF_SERVICE:
                    Log.d("debug", "LocationProvider.OUT_OF_SERVICE");
                    break;
                case LocationProvider.TEMPORARILY_UNAVAILABLE:
                    Log.d("debug", "LocationProvider.TEMPORARILY_UNAVAILABLE");
                    break;
            }
        }
    }

}
