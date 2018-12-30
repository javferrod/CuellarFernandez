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

    AlertDialog.Builder mBuilder;
    AlertDialog dialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestPermission();

        setContentView(R.layout.activity_main);

        Button mShowDialog = findViewById(R.id.logIn);
        mShowDialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mBuilder = new AlertDialog.Builder(MainActivity.this);
                View mViewLogIn = getLayoutInflater().inflate(R.layout.dialog_login, null);
                final EditText mEmail = mViewLogIn.findViewById(R.id.textEmail);
                final EditText mPassword = mViewLogIn.findViewById(R.id.textPassword);
                final Button mLogin = mViewLogIn.findViewById(R.id.logInButton);


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

                mBuilder.setView(mViewLogIn);
                dialog = mBuilder.create();
                dialog.show();

            }
        });

        Button mShowSignUp = findViewById(R.id.singUp);
        mShowSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBuilder = new AlertDialog.Builder(MainActivity.this);
                View mViewSignUp = getLayoutInflater().inflate(R.layout.dialog_register, null);
                final EditText mNameSignUp = mViewSignUp.findViewById(R.id.textName);
                final EditText mSurnameSignUp = mViewSignUp.findViewById(R.id.textSurname);
                final EditText mCodiceFiscaleSignUp = mViewSignUp.findViewById(R.id.textCodiceFiscale);
                final EditText mEmailSignUp = mViewSignUp.findViewById(R.id.textEmail);
                final EditText mPasswordSignUp = mViewSignUp.findViewById(R.id.textPassword);
                final Button mSignUp = mViewSignUp.findViewById(R.id.signUpButton);

                mSignUp.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if(mNameSignUp.getText().toString().isEmpty() || mSurnameSignUp.getText().toString().isEmpty() || mCodiceFiscaleSignUp.getText().toString().isEmpty()
                                || mEmailSignUp.getText().toString().isEmpty() || mPasswordSignUp.getText().toString().isEmpty()) {
                            Toast.makeText(MainActivity.this, "Please fill any empty fields",
                                    Toast.LENGTH_SHORT).show();
                        }
                        else {
                            Toast.makeText(MainActivity.this, "Successfully registered",
                                    Toast.LENGTH_SHORT).show();
                            cancelDialog();
                        }
                    }
                });

                mBuilder.setView(mViewSignUp);
                dialog = mBuilder.create();
                dialog.show();
            }
        });
    }

    protected void requestPermission () {

        ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION},1000);

    }

    private void cancelDialog () {
        dialog.dismiss();
    }
}
