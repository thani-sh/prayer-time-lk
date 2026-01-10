package me.thanish.prayers.domain

import android.content.Context
import androidx.datastore.preferences.core.intPreferencesKey
import me.thanish.prayers.R

/**
 * PrayerTimeMethod is the calculation method for prayer times.
 */
enum class PrayerTimeMethod(
    private val labelKey: Int,
    private val descriptionKey: Int? = null
) {
    acju(R.string.prayers_method_acju);

    /**
     * getLabel returns the name of the prayer method with i18n.
     */
    fun getLabel(context: Context): String {
        return context.getString(labelKey)
    }

    /**
     * getDescription returns the description of the prayer method with i18n.
     */
    fun getDescription(context: Context): String? {
        if (descriptionKey == null) {
            return null
        }
        return context.getString(descriptionKey)
    }

    /**
     * ✄ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
     */

    companion object {
        /**
         * STORE_KEY is the MMKV key for storing the current prayer method.
         */
        private val STORE_KEY = intPreferencesKey("PrayerTimeMethodV2")

        /**
         * set sets the current prayer method.
         */
        fun set(context: Context, method: PrayerTimeMethod) {
            setIntegerSync(context, STORE_KEY, method.ordinal)
        }

        /**
         * get returns the current prayer method.
         */
        fun get(context: Context): PrayerTimeMethod {
            val index = getIntegerSync(context, STORE_KEY, acju.ordinal)
            return entries[index]
        }
    }
}
