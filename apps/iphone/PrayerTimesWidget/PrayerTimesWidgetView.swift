//
//  PrayerTimesWidgetView.swift
//  PrayerTimesWidget
//
//  Created by Jules on 2025-02-04.
//

import SwiftUI
import WidgetKit

struct PrayerTimesWidgetView: View {
    var entry: PrayerTimesWidgetProvider.Entry

    var body: some View {
        if let prayer = entry.prayerTime {
            VStack(alignment: .leading) {
                Spacer()
                Text("Next")
                    .font(.system(size: 8, weight: .bold))
                    .foregroundColor(Color(UIColor.label))

                Text(prayer.type.label)
                    .font(.system(size: 12))
                    .foregroundColor(Color(UIColor.label))
                    .padding(.top, 4)

                Text(prayer.timeString)
                     .font(.system(size: 32, weight: .bold))
                     .foregroundColor(Color(UIColor.label))
                Spacer()
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(8)
            .background(Color(UIColor.systemBackground))
        } else {
            VStack {
                Text("No Data")
            }
        }
    }
}
