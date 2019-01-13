package com.trackme.julian.trackme;

import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Router {

    private Context context;

    private boolean logInCorrect;

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


    public void registerUser(String username, String password, String name, String codice, String gender, String birthdate, String residence) {

        JSONObject json = new JSONObject();

        try {
            json.put("username", username);
            json.put("password", password);
            json.put("name", name);
            json.put("codice", codice);
            json.put("gender", gender);
            json.put("birthdate", birthdate);
            json.put("residence", residence);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ConnectivityManager connMgr = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {
            JsonObjectRequest request = new JsonObjectRequest
                    (Request.Method.POST, "http://51.15.143.114:8080/auth/register-user", json, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE REGISTER USER");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public void logInUser(String username, String password) {

        this.logInCorrect = false;

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

                            SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor edit = sharpref.edit();

                            JSONObject jsonObject = null;
                            try {
                                jsonObject = new JSONObject(response.toString());

                                String token = jsonObject.getString("token");

                                edit.putString("tokenUser", String.valueOf(token));
                                edit.apply();

                                Log.d("debug", sharpref.getString("tokenUser", null));
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                            logInCorrect = true;

                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE LOGIN USER");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public boolean getLogInCorrect() {

        return this.logInCorrect;
    }

    public void postUserData(double latitude, double longitude, int hearthRate, int weight) {

        JSONObject json = new JSONObject();
        JSONObject manJson = new JSONObject();

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        try {
            manJson.put("latitude", latitude);
            manJson.put("longitude", longitude);
            manJson.put("hearthrate", hearthRate);
            if (weight != 0)
                manJson.put("weight", weight);
            json.put("token", sharpref.getString("tokenUser", null));
            json.put("parameters", manJson);
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
                            Log.d("debug", "ERROR RESPONSE POST USER DATA");
                            Log.d("debug", String.valueOf(error.networkResponse));
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public void getPermissionsUser() {

        JSONObject json = new JSONObject();

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        try {
            json.put("token", sharpref.getString("tokenUser", null));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ConnectivityManager connMgr = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {
            JsonObjectRequest request = new JsonObjectRequest
                    (Request.Method.POST, "http://51.15.143.114:8080/permissions/client", json, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {

                            SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);
                            SharedPreferences.Editor edit = sharpref.edit();

                            edit.putString("permissionsUser", String.valueOf(response.toString()));
                            edit.apply();
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE PERMISSION USER");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }

    public void setPermissionUser (int permissionID) {

        JSONObject json = new JSONObject();

        SharedPreferences sharpref = context.getSharedPreferences("app_data", Context.MODE_PRIVATE);

        try {
            json.put("token", sharpref.getString("tokenUser", null));
            json.put("permissionID", permissionID);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        ConnectivityManager connMgr = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connMgr.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isConnected()) {
            JsonObjectRequest request = new JsonObjectRequest
                    (Request.Method.POST, "http://51.15.143.114:8080/permissions/accept", json, new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                        }
                    }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.d("debug", "ERROR RESPONSE PERMISSION USER");
                        }
                    });

            requestQueue.add(request);
        } else {
            Log.d("debug", "NETWORK DISABLED");
        }
    }
}
