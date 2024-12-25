package me.thanish.prayers.worker

import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.AlarmManagerCompat
import androidx.core.app.NotificationCompat
import me.thanish.prayers.R
import me.thanish.prayers.domain.NotificationOffset
import me.thanish.prayers.domain.PrayerTime
import me.thanish.prayers.domain.PrayerTimeCity

/**
 * Worker to show a notification approximately 10 minutes before a prayer time
 * with a countdown timer to show the time remaining.
 */
class NotificationWorker : BroadcastReceiver() {
    /**
     * Runs approximately 10 minutes before the prayer time
     */
    override fun onReceive(context: Context?, intent: Intent?) {
        val prayerTimeId = intent?.getStringExtra(INPUT_PRAYER_TIME_ID) ?: return
        val prayerTime = PrayerTime.fromStringId(prayerTimeId) ?: return
        doNotify(context!!, prayerTime)
    }

    /**
     * Create a timer notification for a specific prayer time
     */
    private fun doNotify(context: Context, prayerTime: PrayerTime) {
        if (!NotificationOffset.isEnabled()) {
            Log.i(TAG, "Notifications are disabled")
            return
        }
        if (PrayerTimeCity.get() != prayerTime.city) {
            Log.i(TAG, "Notifications are for a different city")
            return
        }
        Log.i(TAG, "Creating notification for prayer time: $prayerTime")
        val manager = context.getSystemService(NotificationManager::class.java)
        val notificationId = prayerTime.getEpochSeconds()
        val notificationBuilder = NotificationCompat.Builder(context, CH_ID)
            .setUsesChronometer(true)
            .setShowWhen(true)
            .setWhen(prayerTime.getEpochMilli())
            .setTimeoutAfter(NOTIFICATION_EXPIRE_MS)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setContentTitle(context.getString(R.string.notification_title, prayerTime.type.getLabel(context)))
            .setContentText(context.getString(R.string.notification_title, prayerTime.type.getLabel(context)))

        manager.notify(notificationId, notificationBuilder.build())
    }

    companion object {
        private const val TAG = "NotificationWorker"
        private const val ACTION = "me.thanish.prayers.NOTIFY"
        private const val CH_ID = "prayer_time"
        private const val INPUT_PRAYER_TIME_ID = "prayerTimeId"
        private const val NOTIFICATION_EXPIRE_MS = (1000 * 60 * 5).toLong()

        /**
         * Initialize the notification channel for prayer time notifications
         */
        @RequiresApi(Build.VERSION_CODES.TIRAMISU)
        fun initialize(context: Context) {
            // Create the notification channel
            val manager = context.getSystemService(NotificationManager::class.java)
            val channelName = context.getString(R.string.notification_channel_title)
            val channelPrio = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(CH_ID, channelName, channelPrio).apply {
                description = context.getString(R.string.notification_channel_description)
            }
            // Create the notification channel
            manager.createNotificationChannel(channel)
            // Register the notification worker to receive broadcasts
            context.registerReceiver(
                NotificationWorker(),
                IntentFilter(ACTION),
                Context.RECEIVER_NOT_EXPORTED
            )
        }

        /**
         * Schedule a notification for a specific prayer time
         */
        fun schedule(context: Context, prayerTime: PrayerTime) {
            Log.i(TAG, "Scheduling notification for prayer time: $prayerTime")
            val alarmManager = context.getSystemService(AlarmManager::class.java) ?: return
            val alarmIntent = buildIntent(context, prayerTime)
            if (!AlarmManagerCompat.canScheduleExactAlarms(alarmManager)) {
                Log.w(TAG, "Cannot schedule exact alarms")
                return
            }
            AlarmManagerCompat.setAlarmClock(
                alarmManager,
                getNotificationTime(prayerTime),
                alarmIntent,
                alarmIntent
            )
        }

        /**
         * Helper function to build a notification worker for a specific prayer time
         */
        private fun buildIntent(context: Context, prayerTime: PrayerTime): PendingIntent {
            val intent = Intent(context, NotificationWorker::class.java).apply {
                action = ACTION
                putExtra(INPUT_PRAYER_TIME_ID, prayerTime.getStringId())
            }
            return PendingIntent.getBroadcast(
                context,
                prayerTime.getIntId(),
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
        }

        /**
         * Helper function to get the timeout for the notification worker
         */
        private fun getNotificationTime(prayerTime: PrayerTime): Long {
            val timestamp = prayerTime.getEpochMilli() - NotificationOffset.get().getMilli()
            if (timestamp < System.currentTimeMillis()) {
                return System.currentTimeMillis() + 1000 * 5
            }
            return timestamp
        }
    }
}
