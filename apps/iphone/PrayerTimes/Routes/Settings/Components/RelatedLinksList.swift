//
//  RelatedLinksList.swift
//  PrayerTimes
//
//  Created by Thanish Nizam on 2025-01-31.
//

import SwiftUI

struct RelatedLinksList: View {
    var body: some View {
      Link(destination: URL(string: "https://github.com/thani-sh/prayer-time-lk")!) {
        HStack {
          Image (systemName: "link")
          Text(String(localized: "route_settings_open_github"))
        }
      }
      Link(destination: URL(string: "https://prayertime.lk")!) {
        HStack {
          Image (systemName: "link")
          Text(String(localized: "route_settings_open_website"))
        }
      }
      Link(destination: URL(string: "https://prayertime.lk/docs/privacy")!) {
        HStack {
          Image (systemName: "link")
          Text(String(localized: "route_settings_read_privacy"))
        }
      }
    }
}
