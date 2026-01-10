//
//  PrayerTimeMethod.swift
//  PrayerTimes
//
//  Created by Thanish Nizam on 2025-01-31.
//

import SwiftUI

// PrayerTimeMethod is the method the prayer time is calculated using.
// This value van be used on SwiftUI views using the snippet given below.
//
//   @AppStorage(PrayerTimeMethod.key)
//   private var method: PrayerTimeMethod = PrayerTimeMethod.standard
//
// To update the stored value, set the PrayerTimeMethod.current value.
//
//   PrayerTimeMethod.current = PrayerTimeMethod.acju
//
enum PrayerTimeMethod: String, CaseIterable, Identifiable {
  case acju

  // Key used to store notification offset on UserDefaults
  static let key: String = "PrayerTimeMethodV2"

  // The default value to use before a value is picked by the user
  static let standard: PrayerTimeMethod = .acju

  // The current prayer time method value stored in UserDefaults
  static var current : PrayerTimeMethod {
    get {
      let storedValue = UserDefaults.standard.string(forKey: key)
      return Self(rawValue: storedValue ?? "") ?? PrayerTimeMethod.standard
    }
    set { UserDefaults.standard.set(newValue.id, forKey: key) }
  }

  // MARK: - Computed Properties

  // Unique and machine friendly identifier used for matching
  var id: String { self.rawValue }

  // Localized string of the prayer time cuty
  var label: String {
    switch self {
      case .acju:
        return String(localized: "prayers_method_acju")
    }
  }
}
