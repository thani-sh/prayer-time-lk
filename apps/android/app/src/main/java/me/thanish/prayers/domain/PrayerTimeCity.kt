package me.thanish.prayers.domain

import android.content.Context
import androidx.datastore.preferences.core.intPreferencesKey
import me.thanish.prayers.R

/**
 * PrayerTimeCity is the city of a prayer time.
 */
enum class PrayerTimeCity(private val key: Int) {
    colombo(R.string.prayers_city_colombo),
    others(R.string.prayers_city_others);

    /**
     * getLabel returns the name of the city with i18n.
     */
    fun getLabel(context: Context): String {
        return context.getString(key)
    }

    /**
     * ✄ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
     */

    companion object {
        /**
         * STORE_KEY is the MMKV key for storing the current prayer city.
         */
        private val STORE_KEY = intPreferencesKey("PrayerTimeCity")


        /**
         * set sets the current prayer city.
         */
        fun set(context: Context, city: PrayerTimeCity) {
            setIntegerSync(context, STORE_KEY, city.ordinal)
        }

        /**
         * get returns the current prayer city.
         */
        fun get(context: Context): PrayerTimeCity {
            val index = getIntegerSync(context, STORE_KEY, others.ordinal)
            return entries[index]
        }
    }
}
