package me.thanish.prayers.se.worker

import android.content.Context
import androidx.work.Constraints
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import me.thanish.prayers.se.states.getCity
import me.thanish.prayers.se.times.getNextPrayerTimes
import java.util.concurrent.TimeUnit

/**
 * Worker to schedule notifications for prayer times
 * This worker runs every hour to schedule notifications for the next N prayers
 */
class SchedulerWorker(context: Context, workerParams: WorkerParameters) :
    Worker(context, workerParams) {

    /**
     * Runs approximately every hour to schedule notifications
     */
    override fun doWork(): Result {
        try {
            schedule(applicationContext)
        } catch (e: Exception) {
            e.printStackTrace()
            return Result.failure()
        }
        return Result.success()
    }

    companion object {
        // TODO: maybe optimize this arbitrary number
        private const val PRAYERS_TO_SCHEDULE = 10

        /**
         * Initialize the scheduler worker to run every hour
         */
        fun initialize(context: Context) {
            val request =
                PeriodicWorkRequestBuilder<SchedulerWorker>(repeatInterval = 1, TimeUnit.HOURS)
                    .setConstraints(Constraints(requiresDeviceIdle = true))
                    .build()
            // Cancel and re-enqueue the work if it already exists
            WorkManager.getInstance(context).enqueueUniquePeriodicWork(
                uniqueWorkName = getNotificationWorkerName(),
                existingPeriodicWorkPolicy = ExistingPeriodicWorkPolicy.CANCEL_AND_REENQUEUE,
                request = request
            )
            // Immediately schedule notifications for next N prayers
            schedule(context)
        }

        /**
         * Schedule notifications for next N prayer times
         */
        fun schedule(context: Context) {
            println("scheduling notifications for next $PRAYERS_TO_SCHEDULE prayers")
            getNextPrayerTimes(context, getCity(), PRAYERS_TO_SCHEDULE).forEach { prayerTime ->
                NotificationWorker.schedule(context, prayerTime)
            }
        }

        /**
         * Clear all scheduled notifications and reschedule them
         */
        fun reschedule(context: Context) {
            println("rescheduling notifications for next $PRAYERS_TO_SCHEDULE prayers")
            // TODO: implement this. clear all scheduled notifications and reschedule them
        }

        /**
         * Helper function to get the name of the notification worker
         */
        private fun getNotificationWorkerName(): String {
            return "SchedulerWorker"
        }
    }
}
