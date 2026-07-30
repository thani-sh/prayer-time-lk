package me.thanish.prayers

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import me.thanish.prayers.storage.DbInitializer
import me.thanish.prayers.theme.PrayersTheme
import me.thanish.prayers.worker.NotificationWorker
import me.thanish.prayers.worker.SchedulerWorker
import me.thanish.prayers.worker.DataSyncWorker
import me.thanish.prayers.worker.SyncNotificationHelper

/**
 * MainActivity is the main activity of the app.
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize database and workers asynchronously
        CoroutineScope(Dispatchers.IO).launch {
            DbInitializer.initialize(applicationContext)
            DataSyncWorker.initialize(applicationContext)
            SchedulerWorker.initialize(applicationContext)
            NotificationWorker.initialize(applicationContext)
            SyncNotificationHelper.initialize(applicationContext)
        }

        setContent {
            PrayersTheme {
                Navigation()
            }
        }
    }
}
