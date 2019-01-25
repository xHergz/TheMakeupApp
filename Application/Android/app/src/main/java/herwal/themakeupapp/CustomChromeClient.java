package herwal.themakeupapp;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;

public class CustomChromeClient extends WebChromeClient {
    private String geolocationOrigin;

    private GeolocationPermissions.Callback geolocationCallback;

    private Activity appActivity;

    public CustomChromeClient(Activity creator) {
        appActivity = creator;
    }

    @Override
    public void onGeolocationPermissionsShowPrompt(String origin,
                                                   GeolocationPermissions.Callback callback) {
        // Geolocation permissions coming from this app's Manifest will only be valid for devices with
        // API_VERSION < 23. On API 23 and above, we must check for permissions, and possibly
        // ask for them.
        String perm = Manifest.permission.ACCESS_FINE_LOCATION;
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M ||
                ContextCompat.checkSelfPermission(appActivity.getBaseContext(), perm) == PackageManager.PERMISSION_GRANTED) {
            // we're on SDK < 23 OR user has already granted permission
            callback.invoke(origin, true, false);
        } else {
            if (!ActivityCompat.shouldShowRequestPermissionRationale(appActivity, perm)) {
                // ask the user for permission
                ActivityCompat.requestPermissions(appActivity, new String[] {perm}, MainActivity.MY_PERMISSIONS_REQUEST_FINE_LOCATION);

                // we will use these when user responds
                geolocationOrigin = origin;
                geolocationCallback = callback;
            }
        }
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case MainActivity.MY_PERMISSIONS_REQUEST_FINE_LOCATION:
                boolean allow = false;
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // user has allowed this permission
                    allow = true;
                }
                if (geolocationCallback != null) {
                    // call back to web chrome client
                    geolocationCallback.invoke(geolocationOrigin, allow, false);
                }
                break;
        }
    }
}
