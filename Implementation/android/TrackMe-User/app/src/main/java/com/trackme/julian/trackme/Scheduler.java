package com.trackme.julian.trackme;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.os.CountDownTimer;
import android.os.Looper;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Scheduler {

    private static Scheduler instance = null;

    private Context context;

    private double latitude = 0;
    private double longitude = 0;

    private Location location = null;

    private int weight = 0;

    private int hearthRate = 0;

    private boolean saveCorrect = false;
    private boolean permissionGet = false;

    private JSONArray jsonArray;

    Router router;


    public static Scheduler getInstance(Context context) {

        if (instance == null) {
            instance = new Scheduler(context);
        }

        return instance;
    }

    protected Scheduler(Context context) {

        this.context = context;
        this.router = Router.getInstance(context);
    }


    private void setLatitude(double latitude) {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
        SharedPreferences.Editor edit = sharpref.edit();

        edit.putString("latitudeData", String.valueOf(latitude));
        edit.apply();

        this.latitude = latitude;

    }

    private double getLatitude() {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        double latitude = 0;

        if (this.latitude != 0) {
            latitude = this.latitude;
        } else if (sharpref.contains("latitudeData") == true) {
            latitude = Double.parseDouble(sharpref.getString("latitudeData", null));
        }

        return latitude;
    }

    private void setLongitude(double longitude) {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
        SharedPreferences.Editor edit = sharpref.edit();

        edit.putString("longitudeData", String.valueOf(longitude));
        edit.apply();

        this.longitude = longitude;

    }

    private double getLongitude() {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        double longitude = 0;

        if (this.longitude != 0) {
            longitude = this.longitude;
        } else if (sharpref.contains("longitudeData") == true) {
            longitude = Double.parseDouble(sharpref.getString("longitudeData", null));
        }

        return longitude;
    }

    private void setLocation(Location location) {

        this.location = location;
    }

    private Location getLocation() {

        return this.location;
    }

    private void setWeight(int weight) {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
        SharedPreferences.Editor edit = sharpref.edit();

        edit.putString("weightData", String.valueOf(weight));
        edit.apply();

        this.weight = weight;

    }

    private int getWeight() {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        int weight = 0;

        if (this.weight != 0) {
            weight = this.weight;
        } else if (sharpref.contains("weightData") == true) {
            weight = Integer.parseInt(sharpref.getString("weightData", null));
        }

        return weight;
    }

    private void setHearthRate(int hearthRate) {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
        SharedPreferences.Editor edit = sharpref.edit();

        edit.putString("hearthRateData", String.valueOf(hearthRate));
        edit.apply();

        this.hearthRate = hearthRate;

    }

    private int getHearthRate() {

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        int hearthRate = 0;

        if (this.hearthRate != 0) {
            hearthRate = this.hearthRate;
        } else if (sharpref.contains("hearthRateData") == true) {
            hearthRate = Integer.parseInt(sharpref.getString("hearthRateData", null));
        }

        return hearthRate;
    }

    public boolean getUserData(double latitude, double longitude, Location location, int hearthRate, int weight) {

        boolean post = false;

        if (latitude != 0) {
            setLatitude(latitude);
        }

        if (longitude != 0) {
            setLongitude(longitude);
        }

        if (location != null) {
            setLocation(location);
        }

        if (weight != 0) {
            setWeight(weight);
            saveCorrect = true;
        }

        if (hearthRate != 0) {
            setHearthRate(hearthRate);

            if (getLatitude() != 0 && getLongitude() != 0 && getLocation() != null && getWeight() != 0) {
                post = true;
            }
        }

        if (post) {
            sendUserData(saveCorrect);
            saveCorrect = false;
        }

        return saveCorrect;
    }

    private void sendUserData(boolean newWeight) {

        double latitude;
        double longitude;

        int hearthRate;

        int weight;

        latitude = getLatitude();
        longitude = getLongitude();

        hearthRate = getHearthRate();

        if (newWeight == true) {
            weight = getWeight();
            router.postUserData(latitude, longitude, hearthRate, weight);
        } else {
            router.postUserData(latitude, longitude, hearthRate, 0);
        }
    }

    public JSONArray askPermissionUser() {

        if (permissionGet == false) {
            getPermissionUser();
            permissionGet = true;
        } else {

            SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

            JSONObject jsonObject = null;
            jsonArray = null;
            try {
                jsonObject = new JSONObject(sharpref.getString("permissionsUser", null));
                jsonArray = jsonObject.getJSONArray("permissions");

            } catch (JSONException e) {
                e.printStackTrace();
            }

            permissionGet = false;

        }

        return jsonArray;
    }

    private void getPermissionUser() {

        router.getPermissionsUser();
    }

    public void setPermissionUser(int permissionID) {

        router.setPermissionUser(permissionID);
    }


}
