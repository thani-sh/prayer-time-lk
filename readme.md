# prayer-time-lk

Islamic prayer times for Sri Lanka as a JavaScript Module.

## Getting Started

Install the module:

```sh
npm install @thani-sh/prayer-time-lk
```

Use exported functions to get prayer times.

```js
import { forDate, forToday } from "@thani-sh/prayer-time-lk";

const times = forToday();
// {
//   fajr: [ 4, 46 ],
//   sunrise: [ 6, 2 ],
//   dhuhr: [ 24, 8 ],
//   asr: [ 15, 14 ],
//   asr_hanafi: [ 15, 14 ],
//   maghrib: [ 18, 13 ],
//   isha: [ 19, 23 ]
// }
```

## Contributing

Pull requests are welcome. Please open a Github issue if you have any questions.

## License

[MIT](https://choosealicense.com/licenses/mit/)
