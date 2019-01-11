package com.trackme.julian.trackme;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONException;
import org.json.JSONObject;

public class Router {

    private Context context;

    RequestQueue requestQueue;

    private static Router instance = null;

    public static Router getInstance(Context context) {

        if (instance == null) {
            instance = new Router(context);
        }

        return instance;
    }

    private Router(Context context) {

        this.context = context;

        requestQueue = Volley.newRequestQueue(context);
    }


    public void registerUser() {

    }

    public void logInUser(String username, String password) {

        JSONObject json = new JSONObject();

        try {
            json.put("user", username);
            json.put("password", password);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ConnectivityManager connMgr = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {
            JsonObjectRequest request = new JsonObjectRequest
                    (Request.Method.POST, "http://51.15.143.114:8080/auth/login", json, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Log.d("debug", response.toString());
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public void postUserData(double latitude, double longitude, int hearthRate, int weight) {

        JSONObject json = new JSONObject();
        JSONObject manJson = new JSONObject();

        try {
            manJson.put("latitude", latitude);
            manJson.put("longitude", longitude);
            manJson.put("hearthrate", hearthRate);
            if(weight != 0)
              manJson.put("weight", weight);
            json.put("token", 3);
            json.put("parameters",manJson);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ConnectivityManager connMgr = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {
            JsonObjectRequest request = new JsonObjectRequest
                    (Request.Method.POST, "http://51.15.143.114:8080/data/", json, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            Log.d("debug", "OK RESPONSE");
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public void getPermissionsUser () {

    }
}
