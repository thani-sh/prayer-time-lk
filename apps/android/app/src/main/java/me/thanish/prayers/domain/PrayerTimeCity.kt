package me.thanish.prayers.domain

import android.content.Context
import androidx.datastore.preferences.core.intPreferencesKey
import me.thanish.prayers.R

/**
 * PrayerTimeCity is the city of a prayer time.
 */
enum class PrayerTimeCity(private val key: Int) {
    ampara(R.string.prayers_city_ampara),
    anuradhapura(R.string.prayers_city_anuradhapura),
    badulla(R.string.prayers_city_badulla),
    batticaloa(R.string.prayers_city_batticaloa),
    colombo(R.string.prayers_city_colombo),
    dehiaththakandiya(R.string.prayers_city_dehiaththakandiya),
    galle(R.string.prayers_city_galle),
    gampaha(R.string.prayers_city_gampaha),
    hambantota(R.string.prayers_city_hambantota),
    jaffna(R.string.prayers_city_jaffna),
    kalutara(R.string.prayers_city_kalutara),
    kandy(R.string.prayers_city_kandy),
    kegalle(R.string.prayers_city_kegalle),
    kilinochchi(R.string.prayers_city_kilinochchi),
    kurunegala(R.string.prayers_city_kurunegala),
    mannar(R.string.prayers_city_mannar),
    matale(R.string.prayers_city_matale),
    matara(R.string.prayers_city_matara),
    monaragala(R.string.prayers_city_monaragala),
    mullaitivu(R.string.prayers_city_mullaitivu),
    nallur(R.string.prayers_city_nallur),
    nuwaraeliya(R.string.prayers_city_nuwaraeliya),
    padiyatalawa(R.string.prayers_city_padiyatalawa),
    polonnaruwa(R.string.prayers_city_polonnaruwa),
    puttalam(R.string.prayers_city_puttalam),
    ratnapura(R.string.prayers_city_ratnapura),
    trincomalee(R.string.prayers_city_trincomalee),
    vavuniya(R.string.prayers_city_vavuniya);

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
        private val STORE_KEY = intPreferencesKey("PrayerTimeCityV2")


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
            val index = getIntegerSync(context, STORE_KEY, colombo.ordinal)
            return entries[index]
        }
    }
}
