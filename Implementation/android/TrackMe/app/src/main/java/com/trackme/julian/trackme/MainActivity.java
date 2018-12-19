package com.trackme.julian.trackme;

import android.Manifest;
import android.content.Intent;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    protected void requestPermission () {

        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION},1000);

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestPermission();

        setContentView(R.layout.activity_main);

        Button mShowDialog = findViewById(R.id.logIn);
        mShowDialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder mBuilder = new AlertDialog.Builder(MainActivity.this);
                View mView = getLayoutInflater().inflate(R.layout.dialog_login, null);
                final EditText mEmail = mView.findViewById(R.id.textEmail);
                final EditText mPassword = mView.findViewById(R.id.textPassword);
                final Button mLogin = mView.findViewById(R.id.logInButton);


                mLogin.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if(mEmail.getText().toString().isEmpty() || mPassword.getText().toString().isEmpty()) {
                            Toast.makeText(MainActivity.this, "Please fill any empty fields",
                                    Toast.LENGTH_SHORT).show();
                        }
                        else {
                            Intent ListSong = new Intent(getApplicationContext(), Recollector.class);
                            startActivity(ListSong);
                        }
                    }
                });


                mBuilder.setView(mView);
                AlertDialog dialog = mBuilder.create();
                dialog.show();

            }
        });
    }
}
