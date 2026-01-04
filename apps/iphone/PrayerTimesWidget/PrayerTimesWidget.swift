//
//  PrayerTimesWidget.swift
//  PrayerTimesWidget
//
//  Created by Jules on 2025-02-04.
//

import WidgetKit
import SwiftUI

struct PrayerTimesWidget: Widget {
    let kind: String = "PrayerTimesWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: PrayerTimesWidgetProvider()) { entry in
            PrayerTimesWidgetView(entry: entry)
        }
        .configurationDisplayName("Next Prayer")
        .description("Shows the next prayer time.")
        .supportedFamilies([.systemSmall])
    }
}
