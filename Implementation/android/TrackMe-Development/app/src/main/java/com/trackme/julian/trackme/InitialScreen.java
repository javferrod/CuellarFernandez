package com.trackme.julian.trackme;

import android.Manifest;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.CountDownTimer;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import java.util.Calendar;

public class InitialScreen extends AppCompatActivity {

    AlertDialog.Builder mBuilder;
    AlertDialog dialog;

    Router router;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        requestPermission();

        router = Router.getInstance(getApplicationContext());

        setContentView(R.layout.initial_screen);

        Button mShowDialog = findViewById(R.id.logIn);
        mShowDialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                SharedPreferences sharpref = getApplicationContext().getSharedPreferences("app_data", Context.MODE_PRIVATE);

                if (sharpref.contains("tokenUser") == false) {

                    login();
                }

                else if (sharpref.getString("sessionOpen", "0").equals("0")) {

                    login();
                }

                else {

                    Toast.makeText(InitialScreen.this, "Autologin successfully",
                            Toast.LENGTH_SHORT).show();

                    Intent ListSong = new Intent(getApplicationContext(), Recollector.class);
                    startActivity(ListSong);
                }
            }
        });

        Button mShowSignUp = findViewById(R.id.singUp);
        mShowSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mBuilder = new AlertDialog.Builder(InitialScreen.this);
                View mViewSignUp = getLayoutInflater().inflate(R.layout.dialog_register, null);
                final EditText mNameSignUp = mViewSignUp.findViewById(R.id.textName);
                final EditText mBirthdateSingUp = mViewSignUp.findViewById(R.id.textBirthdate);
                final RadioGroup mGenderGroup = mViewSignUp.findViewById(R.id.radioGender);
                final RadioButton mGenderMasculineSingUp = mViewSignUp.findViewById(R.id.radioGenderMasculine);
                final RadioButton mGenderFemenineSingUp = mViewSignUp.findViewById(R.id.radioGenderFemenine);
                final EditText mCodiceFiscaleSignUp = mViewSignUp.findViewById(R.id.textCodiceFiscale);
                final EditText mResidence = mViewSignUp.findViewById(R.id.textResidence);
                final EditText mEmailSignUp = mViewSignUp.findViewById(R.id.textEmail);
                final EditText mPasswordSignUp = mViewSignUp.findViewById(R.id.textPassword);
                final Button mSignUp = mViewSignUp.findViewById(R.id.signUpButton);

                mBirthdateSingUp.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        int actualDay, actualMonth, actualYear;

                        final Calendar c = Calendar.getInstance();

                        actualDay = c.get(Calendar.DAY_OF_MONTH);
                        actualMonth = c.get(Calendar.MONTH);
                        actualYear = c.get(Calendar.YEAR);

                        DatePickerDialog datePickerDialog = new DatePickerDialog(InitialScreen.this, new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                                mBirthdateSingUp.setText(dayOfMonth + "/" + (month + 1) + "/" + year);
                            }
                        }
                                , actualYear, actualMonth, actualDay);

                        datePickerDialog.show();
                    }
                });

                mSignUp.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {

                        if (mNameSignUp.getText().toString().isEmpty() || mBirthdateSingUp.getText().toString().isEmpty() || mCodiceFiscaleSignUp.getText().toString().isEmpty()
                                || mResidence.getText().toString().isEmpty() || mEmailSignUp.getText().toString().isEmpty() || mPasswordSignUp.getText().toString().isEmpty() ||
                                mGenderGroup.getCheckedRadioButtonId() == -1) {

                            Toast.makeText(InitialScreen.this, "Please fill any empty fields",
                                    Toast.LENGTH_SHORT).show();

                        } else {

                            if (mGenderMasculineSingUp.isChecked()) {

                                String gender = "M";

                                router.registerUser(mEmailSignUp.getText().toString(), mPasswordSignUp.getText().toString(), mNameSignUp.getText().toString(),
                                        mCodiceFiscaleSignUp.getText().toString(), gender, mBirthdateSingUp.getText().toString(), mResidence.getText().toString());
                            } else {

                                String gender = "F";

                                router.registerUser(mEmailSignUp.getText().toString(), mPasswordSignUp.getText().toString(), mNameSignUp.getText().toString(),
                                        mCodiceFiscaleSignUp.getText().toString(), gender, mBirthdateSingUp.getText().toString(), mResidence.getText().toString());
                            }


                            Toast.makeText(InitialScreen.this, "Successfully registered",
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

    protected void requestPermission() {

        ActivityCompat.requestPermissions(InitialScreen.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1000);

    }

    private void cancelDialog() {
        dialog.dismiss();
    }

    private void login () {

        mBuilder = new AlertDialog.Builder(InitialScreen.this);
        View mViewLogIn = getLayoutInflater().inflate(R.layout.dialog_login, null);
        final EditText mEmail = mViewLogIn.findViewById(R.id.textEmail);
        final EditText mPassword = mViewLogIn.findViewById(R.id.textPassword);
        final CheckBox mSessionOpen = mViewLogIn.findViewById(R.id.checkSessionOpen);
        final Button mLogin = mViewLogIn.findViewById(R.id.logInButton);


        mLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mEmail.getText().toString().isEmpty() || mPassword.getText().toString().isEmpty()) {
                    Toast.makeText(InitialScreen.this, "Please fill any empty fields",
                            Toast.LENGTH_SHORT).show();
                } else {

                    router.logInUser(mEmail.getText().toString(), mPassword.getText().toString());

                    new CountDownTimer(750, 1) {

                        public void onTick(long millisUntilFinished) {
                        }

                        public void onFinish() {

                            boolean logInCorrect;

                            logInCorrect = router.getLogInCorrect();

                            if (logInCorrect) {

                                if(mSessionOpen.isChecked()) {

                                    SharedPreferences sharpref = getApplicationContext().getSharedPreferences("app_data", Context.MODE_PRIVATE);
                                    SharedPreferences.Editor edit = sharpref.edit();

                                    edit.putString("sessionOpen", "1");
                                    edit.apply();
                                }

                                Intent ListSong = new Intent(getApplicationContext(), Recollector.class);
                                startActivity(ListSong);
                            }
                        }
                    }.start();
                }
            }
        });

        mBuilder.setView(mViewLogIn);
        dialog = mBuilder.create();
        dialog.show();
    }
}
