package herwal.themakeupapp;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.webkit.GeolocationPermissions;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends Activity {

    public static final int MY_PERMISSIONS_REQUEST_FINE_LOCATION = 1;

    private WebView mainWebView;

    public static final int REQUEST_SELECT_FILE = 100;

    public ValueCallback<Uri[]> uploadMessage;

    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        if (requestCode == REQUEST_SELECT_FILE) {
            if (uploadMessage == null) return;
            uploadMessage.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
            uploadMessage = null;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        CheckPermissions();
        InitializeWebView();
    }

    @Override
    public void onBackPressed() {
        if (mainWebView.canGoBack()) {
            mainWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    private void CheckPermissions() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_DENIED
                || ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_DENIED
                || ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_DENIED) {
            String [] requiredPermissions = new String[] {Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.CAMERA,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE};
            ActivityCompat.requestPermissions(this, requiredPermissions, MY_PERMISSIONS_REQUEST_FINE_LOCATION);
        }
    }

    private void InitializeWebView() {
        mainWebView = findViewById(R.id.main_webview);
        // Enable Javascript
        WebSettings webSettings = mainWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        mainWebView.setWebChromeClient(new CustomChromeClient(this));
        mainWebView.setWebViewClient(new CustomWebClient());

        mainWebView.loadUrl(getResources().getString(R.string.site_url));
    }
}
