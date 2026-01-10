//
//  PrayerTimeCity.swift
//  PrayerTimes
//
//  Created by Thanish Nizam on 2025-01-31.
//

import SwiftUI

// PrayerTimeCity is the city the prayer time is calculated for.
// This value van be used on SwiftUI views using the snippet given below.
//
//   @AppStorage(PrayerTimeCity.key)
//   private var city: PrayerTimeCity = PrayerTimeCity.standard
//
// To update the stored value, set the PrayerTimeCity.current value.
//
//   PrayerTimeCity.current = PrayerTimeCity.colombo
//
enum PrayerTimeCity: String, CaseIterable, Identifiable {
  case ampara, anuradhapura, badulla, batticaloa, colombo, dehiaththakandiya, galle, gampaha, hambantota, jaffna, kalutara, kandy, kegalle, kilinochchi, kurunegala, mannar, matale, matara, monaragala, mullaitivu, nallur, nuwaraeliya, padiyatalawa, polonnaruwa, puttalam, ratnapura, trincomalee, vavuniya

  // Key used to store notification offset on UserDefaults
  static let key: String = "PrayerTimeCityV2"

  // The default value to use before a value is picked by the user
  static let standard: PrayerTimeCity = .colombo

  // The current prayer time city value stored in UserDefaults
  static var current : PrayerTimeCity {
    get {
      let storedValue = UserDefaults.standard.string(forKey: key)
      return Self(rawValue: storedValue ?? "") ?? PrayerTimeCity.standard
    }
    set { UserDefaults.standard.set(newValue.id, forKey: key) }
  }

  // MARK: - Computed Properties

  // Unique and machine friendly identifier used for matching
  var id: String { self.rawValue }

  // Localized string of the prayer time cuty
  var label: String {
    switch self {
      case .ampara:
        return String(localized: "prayers_city_ampara")
      case .anuradhapura:
        return String(localized: "prayers_city_anuradhapura")
      case .badulla:
        return String(localized: "prayers_city_badulla")
      case .batticaloa:
        return String(localized: "prayers_city_batticaloa")
      case .colombo:
        return String(localized: "prayers_city_colombo")
      case .dehiaththakandiya:
        return String(localized: "prayers_city_dehiaththakandiya")
      case .galle:
        return String(localized: "prayers_city_galle")
      case .gampaha:
        return String(localized: "prayers_city_gampaha")
      case .hambantota:
        return String(localized: "prayers_city_hambantota")
      case .jaffna:
        return String(localized: "prayers_city_jaffna")
      case .kalutara:
        return String(localized: "prayers_city_kalutara")
      case .kandy:
        return String(localized: "prayers_city_kandy")
      case .kegalle:
        return String(localized: "prayers_city_kegalle")
      case .kilinochchi:
        return String(localized: "prayers_city_kilinochchi")
      case .kurunegala:
        return String(localized: "prayers_city_kurunegala")
      case .mannar:
        return String(localized: "prayers_city_mannar")
      case .matale:
        return String(localized: "prayers_city_matale")
      case .matara:
        return String(localized: "prayers_city_matara")
      case .monaragala:
        return String(localized: "prayers_city_monaragala")
      case .mullaitivu:
        return String(localized: "prayers_city_mullaitivu")
      case .nallur:
        return String(localized: "prayers_city_nallur")
      case .nuwaraeliya:
        return String(localized: "prayers_city_nuwaraeliya")
      case .padiyatalawa:
        return String(localized: "prayers_city_padiyatalawa")
      case .polonnaruwa:
        return String(localized: "prayers_city_polonnaruwa")
      case .puttalam:
        return String(localized: "prayers_city_puttalam")
      case .ratnapura:
        return String(localized: "prayers_city_ratnapura")
      case .trincomalee:
        return String(localized: "prayers_city_trincomalee")
      case .vavuniya:
        return String(localized: "prayers_city_vavuniya")
    }
  }
}
