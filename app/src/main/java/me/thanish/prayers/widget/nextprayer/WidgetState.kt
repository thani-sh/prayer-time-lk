package me.thanish.prayers.widget.nextprayer

import android.content.Context
import androidx.glance.state.GlanceStateDefinition
import me.thanish.prayers.domain.PrayerTime
import me.thanish.prayers.widget.nextprayer.store.NextPrayerTimeStore
import java.io.File

class WidgetState : GlanceStateDefinition<PrayerTime> {
    override suspend fun getDataStore(
        context: Context,
        fileKey: String
    ): NextPrayerTimeStore {
        return NextPrayerTimeStore(context)
    }

    override fun getLocation(context: Context, fileKey: String): File {
        TODO("Not yet implemented")
    }
}
