package com.trackme.julian.trackme;

import android.location.Location;
import android.util.Log;

public class Router {

    private static Router instance = null;

    public static Router getInstance () {

        if (instance == null) {
            instance = new Router();
        }

        return instance;
    }

    private Router() {}


    public void postUserData (double latitude, double longitude, Location location, int hearthRate, int weight) {

        Log.d("debug", "POST CORRECT, DATA: " + longitude + " " + longitude + " " + location + " " + hearthRate + " " + weight);

    }

}
