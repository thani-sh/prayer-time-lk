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
  case colombo, others
  
  // Key used to store notification offset on UserDefaults
  static let key: String = "PrayerTimeCity"
  
  // The default value to use before a value is picked by the user
  static let standard: PrayerTimeCity = .others
  
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
      case .colombo:
        return String(localized: "prayers_city_colombo")
      case .others:
        return String(localized: "prayers_city_others")
    }
  }
}
