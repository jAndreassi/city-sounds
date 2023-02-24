var countryData = {
  name: { code: 'country', lat: 'latitude', lon: 'longitude' },
  Andorra: { code: 'AD', lat: '42.546245', lon: '1.601554' },
  'United Arab Emirates': { code: 'AE', lat: '23.424076', lon: '53.847818' },
  Afghanistan: { code: 'AF', lat: '33.93911', lon: '67.709953' },
  'Antigua and Barbuda': { code: 'AG', lat: '17.060816', lon: '-61.796428' },
  Anguilla: { code: 'AI', lat: '18.220554', lon: '-63.068615' },
  Albania: { code: 'AL', lat: '41.153332', lon: '20.168331' },
  Armenia: { code: 'AM', lat: '40.069099', lon: '45.038189' },
  'Netherlands Antilles': { code: 'AN', lat: '12.226079', lon: '-69.060087' },
  Angola: { code: 'AO', lat: '-11.202692', lon: '17.873887' },
  Antarctica: { code: 'AQ', lat: '-75.250973', lon: '-0.071389' },
  Argentina: { code: 'AR', lat: '-38.416097', lon: '-63.616672' },
  'American Samoa': { code: 'AS', lat: '-14.270972', lon: '-170.132217' },
  Austria: { code: 'AT', lat: '47.516231', lon: '14.550072' },
  Australia: { code: 'AU', lat: '-25.274398', lon: '133.775136' },
  Aruba: { code: 'AW', lat: '12.52111', lon: '-69.968338' },
  Azerbaijan: { code: 'AZ', lat: '40.143105', lon: '47.576927' },
  'Bosnia and Herzegovina': { code: 'BA', lat: '43.915886', lon: '17.679076' },
  Barbados: { code: 'BB', lat: '13.193887', lon: '-59.543198' },
  Bangladesh: { code: 'BD', lat: '23.684994', lon: '90.356331' },
  Belgium: { code: 'BE', lat: '50.503887', lon: '4.469936' },
  'Burkina Faso': { code: 'BF', lat: '12.238333', lon: '-1.561593' },
  Bulgaria: { code: 'BG', lat: '42.733883', lon: '25.48583' },
  Bahrain: { code: 'BH', lat: '25.930414', lon: '50.637772' },
  Burundi: { code: 'BI', lat: '-3.373056', lon: '29.918886' },
  Benin: { code: 'BJ', lat: '9.30769', lon: '2.315834' },
  Bermuda: { code: 'BM', lat: '32.321384', lon: '-64.75737' },
  Brunei: { code: 'BN', lat: '4.535277', lon: '114.727669' },
  Bolivia: { code: 'BO', lat: '-16.290154', lon: '-63.588653' },
  Brazil: { code: 'BR', lat: '-14.235004', lon: '-51.92528' },
  Bahamas: { code: 'BS', lat: '25.03428', lon: '-77.39628' },
  Bhutan: { code: 'BT', lat: '27.514162', lon: '90.433601' },
  'Bouvet Island': { code: 'BV', lat: '-54.423199', lon: '3.413194' },
  Botswana: { code: 'BW', lat: '-22.328474', lon: '24.684866' },
  Belarus: { code: 'BY', lat: '53.709807', lon: '27.953389' },
  Belize: { code: 'BZ', lat: '17.189877', lon: '-88.49765' },
  Canada: { code: 'CA', lat: '56.130366', lon: '-106.346771' },
  'Cocos [Keeling] Islands': {
    code: 'CC',
    lat: '-12.164165',
    lon: '96.870956',
  },
  'Congo [DRC]': { code: 'CD', lat: '-4.038333', lon: '21.758664' },
  'Central African Republic': { code: 'CF', lat: '6.611111', lon: '20.939444' },
  'Congo [Republic]': { code: 'CG', lat: '-0.228021', lon: '15.827659' },
  Switzerland: { code: 'CH', lat: '46.818188', lon: '8.227512' },
  "Côte d'Ivoire": { code: 'CI', lat: '7.539989', lon: '-5.54708' },
  'Cook Islands': { code: 'CK', lat: '-21.236736', lon: '-159.777671' },
  Chile: { code: 'CL', lat: '-35.675147', lon: '-71.542969' },
  Cameroon: { code: 'CM', lat: '7.369722', lon: '12.354722' },
  China: { code: 'CN', lat: '35.86166', lon: '104.195397' },
  Colombia: { code: 'CO', lat: '4.570868', lon: '-74.297333' },
  'Costa Rica': { code: 'CR', lat: '9.748917', lon: '-83.753428' },
  Cuba: { code: 'CU', lat: '21.521757', lon: '-77.781167' },
  'Cape Verde': { code: 'CV', lat: '16.002082', lon: '-24.013197' },
  'Christmas Island': { code: 'CX', lat: '-10.447525', lon: '105.690449' },
  Cyprus: { code: 'CY', lat: '35.126413', lon: '33.429859' },
  'Czech Republic': { code: 'CZ', lat: '49.817492', lon: '15.472962' },
  Germany: { code: 'DE', lat: '51.165691', lon: '10.451526' },
  Djibouti: { code: 'DJ', lat: '11.825138', lon: '42.590275' },
  Denmark: { code: 'DK', lat: '56.26392', lon: '9.501785' },
  Dominica: { code: 'DM', lat: '15.414999', lon: '-61.370976' },
  'Dominican Republic': { code: 'DO', lat: '18.735693', lon: '-70.162651' },
  Algeria: { code: 'DZ', lat: '28.033886', lon: '1.659626' },
  Ecuador: { code: 'EC', lat: '-1.831239', lon: '-78.183406' },
  Estonia: { code: 'EE', lat: '58.595272', lon: '25.013607' },
  Egypt: { code: 'EG', lat: '26.820553', lon: '30.802498' },
  'Western Sahara': { code: 'EH', lat: '24.215527', lon: '-12.885834' },
  Eritrea: { code: 'ER', lat: '15.179384', lon: '39.782334' },
  Spain: { code: 'ES', lat: '40.463667', lon: '-3.74922' },
  Ethiopia: { code: 'ET', lat: '9.145', lon: '40.489673' },
  Finland: { code: 'FI', lat: '61.92411', lon: '25.748151' },
  Fiji: { code: 'FJ', lat: '-16.578193', lon: '179.414413' },
  'Falkland Islands [Islas Malvinas]': {
    code: 'FK',
    lat: '-51.796253',
    lon: '-59.523613',
  },
  Micronesia: { code: 'FM', lat: '7.425554', lon: '150.550812' },
  'Faroe Islands': { code: 'FO', lat: '61.892635', lon: '-6.911806' },
  France: { code: 'FR', lat: '46.227638', lon: '2.213749' },
  Gabon: { code: 'GA', lat: '-0.803689', lon: '11.609444' },
  'United Kingdom': { code: 'GB', lat: '55.378051', lon: '-3.435973' },
  Grenada: { code: 'GD', lat: '12.262776', lon: '-61.604171' },
  Georgia: { code: 'GE', lat: '42.315407', lon: '43.356892' },
  'French Guiana': { code: 'GF', lat: '3.933889', lon: '-53.125782' },
  Guernsey: { code: 'GG', lat: '49.465691', lon: '-2.585278' },
  Ghana: { code: 'GH', lat: '7.946527', lon: '-1.023194' },
  Gibraltar: { code: 'GI', lat: '36.137741', lon: '-5.345374' },
  Greenland: { code: 'GL', lat: '71.706936', lon: '-42.604303' },
  Gambia: { code: 'GM', lat: '13.443182', lon: '-15.310139' },
  Guinea: { code: 'GN', lat: '9.945587', lon: '-9.696645' },
  Guadeloupe: { code: 'GP', lat: '16.995971', lon: '-62.067641' },
  'Equatorial Guinea': { code: 'GQ', lat: '1.650801', lon: '10.267895' },
  Greece: { code: 'GR', lat: '39.074208', lon: '21.824312' },
  'South Georgia and the South Sandwich Islands': {
    code: 'GS',
    lat: '-54.429579',
    lon: '-36.587909',
  },
  Guatemala: { code: 'GT', lat: '15.783471', lon: '-90.230759' },
  Guam: { code: 'GU', lat: '13.444304', lon: '144.793731' },
  'Guinea-Bissau': { code: 'GW', lat: '11.803749', lon: '-15.180413' },
  Guyana: { code: 'GY', lat: '4.860416', lon: '-58.93018' },
  'Gaza Strip': { code: 'GZ', lat: '31.354676', lon: '34.308825' },
  'Hong Kong': { code: 'HK', lat: '22.396428', lon: '114.109497' },
  'Heard Island and McDonald Islands': {
    code: 'HM',
    lat: '-53.08181',
    lon: '73.504158',
  },
  Honduras: { code: 'HN', lat: '15.199999', lon: '-86.241905' },
  Croatia: { code: 'HR', lat: '45.1', lon: '15.2' },
  Haiti: { code: 'HT', lat: '18.971187', lon: '-72.285215' },
  Hungary: { code: 'HU', lat: '47.162494', lon: '19.503304' },
  Indonesia: { code: 'ID', lat: '-0.789275', lon: '113.921327' },
  Ireland: { code: 'IE', lat: '53.41291', lon: '-8.24389' },
  Israel: { code: 'IL', lat: '31.046051', lon: '34.851612' },
  'Isle of Man': { code: 'IM', lat: '54.236107', lon: '-4.548056' },
  India: { code: 'IN', lat: '20.593684', lon: '78.96288' },
  'British Indian Ocean Territory': {
    code: 'IO',
    lat: '-6.343194',
    lon: '71.876519',
  },
  Iraq: { code: 'IQ', lat: '33.223191', lon: '43.679291' },
  Iran: { code: 'IR', lat: '32.427908', lon: '53.688046' },
  Iceland: { code: 'IS', lat: '64.963051', lon: '-19.020835' },
  Italy: { code: 'IT', lat: '41.87194', lon: '12.56738' },
  Jersey: { code: 'JE', lat: '49.214439', lon: '-2.13125' },
  Jamaica: { code: 'JM', lat: '18.109581', lon: '-77.297508' },
  Jordan: { code: 'JO', lat: '30.585164', lon: '36.238414' },
  Japan: { code: 'JP', lat: '36.204824', lon: '138.252924' },
  Kenya: { code: 'KE', lat: '-0.023559', lon: '37.906193' },
  Kyrgyzstan: { code: 'KG', lat: '41.20438', lon: '74.766098' },
  Cambodia: { code: 'KH', lat: '12.565679', lon: '104.990963' },
  Kiribati: { code: 'KI', lat: '-3.370417', lon: '-168.734039' },
  Comoros: { code: 'KM', lat: '-11.875001', lon: '43.872219' },
  'Saint Kitts and Nevis': { code: 'KN', lat: '17.357822', lon: '-62.782998' },
  'North Korea': { code: 'KP', lat: '40.339852', lon: '127.510093' },
  'South Korea': { code: 'KR', lat: '35.907757', lon: '127.766922' },
  Kuwait: { code: 'KW', lat: '29.31166', lon: '47.481766' },
  'Cayman Islands': { code: 'KY', lat: '19.513469', lon: '-80.566956' },
  Kazakhstan: { code: 'KZ', lat: '48.019573', lon: '66.923684' },
  Laos: { code: 'LA', lat: '19.85627', lon: '102.495496' },
  Lebanon: { code: 'LB', lat: '33.854721', lon: '35.862285' },
  'Saint Lucia': { code: 'LC', lat: '13.909444', lon: '-60.978893' },
  Liechtenstein: { code: 'LI', lat: '47.166', lon: '9.555373' },
  'Sri Lanka': { code: 'LK', lat: '7.873054', lon: '80.771797' },
  Liberia: { code: 'LR', lat: '6.428055', lon: '-9.429499' },
  Lesotho: { code: 'LS', lat: '-29.609988', lon: '28.233608' },
  Lithuania: { code: 'LT', lat: '55.169438', lon: '23.881275' },
  Luxembourg: { code: 'LU', lat: '49.815273', lon: '6.129583' },
  Latvia: { code: 'LV', lat: '56.879635', lon: '24.603189' },
  Libya: { code: 'LY', lat: '26.3351', lon: '17.228331' },
  Morocco: { code: 'MA', lat: '31.791702', lon: '-7.09262' },
  Monaco: { code: 'MC', lat: '43.750298', lon: '7.412841' },
  Moldova: { code: 'MD', lat: '47.411631', lon: '28.369885' },
  Montenegro: { code: 'ME', lat: '42.708678', lon: '19.37439' },
  Madagascar: { code: 'MG', lat: '-18.766947', lon: '46.869107' },
  'Marshall Islands': { code: 'MH', lat: '7.131474', lon: '171.184478' },
  'Macedonia [FYROM]': { code: 'MK', lat: '41.608635', lon: '21.745275' },
  Mali: { code: 'ML', lat: '17.570692', lon: '-3.996166' },
  'Myanmar [Burma]': { code: 'MM', lat: '21.913965', lon: '95.956223' },
  Mongolia: { code: 'MN', lat: '46.862496', lon: '103.846656' },
  Macau: { code: 'MO', lat: '22.198745', lon: '113.543873' },
  'Northern Mariana Islands': { code: 'MP', lat: '17.33083', lon: '145.38469' },
  Martinique: { code: 'MQ', lat: '14.641528', lon: '-61.024174' },
  Mauritania: { code: 'MR', lat: '21.00789', lon: '-10.940835' },
  Montserrat: { code: 'MS', lat: '16.742498', lon: '-62.187366' },
  Malta: { code: 'MT', lat: '35.937496', lon: '14.375416' },
  Mauritius: { code: 'MU', lat: '-20.348404', lon: '57.552152' },
  Maldives: { code: 'MV', lat: '3.202778', lon: '73.22068' },
  Malawi: { code: 'MW', lat: '-13.254308', lon: '34.301525' },
  Mexico: { code: 'MX', lat: '23.634501', lon: '-102.552784' },
  Malaysia: { code: 'MY', lat: '4.210484', lon: '101.975766' },
  Mozambique: { code: 'MZ', lat: '-18.665695', lon: '35.529562' },
  Namibia: { code: 'NA', lat: '-22.95764', lon: '18.49041' },
  'New Caledonia': { code: 'NC', lat: '-20.904305', lon: '165.618042' },
  Niger: { code: 'NE', lat: '17.607789', lon: '8.081666' },
  'Norfolk Island': { code: 'NF', lat: '-29.040835', lon: '167.954712' },
  Nigeria: { code: 'NG', lat: '9.081999', lon: '8.675277' },
  Nicaragua: { code: 'NI', lat: '12.865416', lon: '-85.207229' },
  Netherlands: { code: 'NL', lat: '52.132633', lon: '5.291266' },
  Norway: { code: 'NO', lat: '60.472024', lon: '8.468946' },
  Nepal: { code: 'NP', lat: '28.394857', lon: '84.124008' },
  Nauru: { code: 'NR', lat: '-0.522778', lon: '166.931503' },
  Niue: { code: 'NU', lat: '-19.054445', lon: '-169.867233' },
  'New Zealand': { code: 'NZ', lat: '-40.900557', lon: '174.885971' },
  Oman: { code: 'OM', lat: '21.512583', lon: '55.923255' },
  Panama: { code: 'PA', lat: '8.537981', lon: '-80.782127' },
  Peru: { code: 'PE', lat: '-9.189967', lon: '-75.015152' },
  'French Polynesia': { code: 'PF', lat: '-17.679742', lon: '-149.406843' },
  'Papua New Guinea': { code: 'PG', lat: '-6.314993', lon: '143.95555' },
  Philippines: { code: 'PH', lat: '12.879721', lon: '121.774017' },
  Pakistan: { code: 'PK', lat: '30.375321', lon: '69.345116' },
  Poland: { code: 'PL', lat: '51.919438', lon: '19.145136' },
  'Saint Pierre and Miquelon': {
    code: 'PM',
    lat: '46.941936',
    lon: '-56.27111',
  },
  'Pitcairn Islands': { code: 'PN', lat: '-24.703615', lon: '-127.439308' },
  'Puerto Rico': { code: 'PR', lat: '18.220833', lon: '-66.590149' },
  'Palestinian Territories': { code: 'PS', lat: '31.952162', lon: '35.233154' },
  Portugal: { code: 'PT', lat: '39.399872', lon: '-8.224454' },
  Palau: { code: 'PW', lat: '7.51498', lon: '134.58252' },
  Paraguay: { code: 'PY', lat: '-23.442503', lon: '-58.443832' },
  Qatar: { code: 'QA', lat: '25.354826', lon: '51.183884' },
  Réunion: { code: 'RE', lat: '-21.115141', lon: '55.536384' },
  Romania: { code: 'RO', lat: '45.943161', lon: '24.96676' },
  Serbia: { code: 'RS', lat: '44.016521', lon: '21.005859' },
  Russia: { code: 'RU', lat: '61.52401', lon: '105.318756' },
  Rwanda: { code: 'RW', lat: '-1.940278', lon: '29.873888' },
  'Saudi Arabia': { code: 'SA', lat: '23.885942', lon: '45.079162' },
  'Solomon Islands': { code: 'SB', lat: '-9.64571', lon: '160.156194' },
  Seychelles: { code: 'SC', lat: '-4.679574', lon: '55.491977' },
  Sudan: { code: 'SD', lat: '12.862807', lon: '30.217636' },
  Sweden: { code: 'SE', lat: '60.128161', lon: '18.643501' },
  Singapore: { code: 'SG', lat: '1.352083', lon: '103.819836' },
  'Saint Helena': { code: 'SH', lat: '-24.143474', lon: '-10.030696' },
  Slovenia: { code: 'SI', lat: '46.151241', lon: '14.995463' },
  'Svalbard and Jan Mayen': { code: 'SJ', lat: '77.553604', lon: '23.670272' },
  Slovakia: { code: 'SK', lat: '48.669026', lon: '19.699024' },
  'Sierra Leone': { code: 'SL', lat: '8.460555', lon: '-11.779889' },
  'San Marino': { code: 'SM', lat: '43.94236', lon: '12.457777' },
  Senegal: { code: 'SN', lat: '14.497401', lon: '-14.452362' },
  Somalia: { code: 'SO', lat: '5.152149', lon: '46.199616' },
  Suriname: { code: 'SR', lat: '3.919305', lon: '-56.027783' },
  'São Tomé and Príncipe': { code: 'ST', lat: '0.18636', lon: '6.613081' },
  'El Salvador': { code: 'SV', lat: '13.794185', lon: '-88.89653' },
  Syria: { code: 'SY', lat: '34.802075', lon: '38.996815' },
  Swaziland: { code: 'SZ', lat: '-26.522503', lon: '31.465866' },
  'Turks and Caicos Islands': {
    code: 'TC',
    lat: '21.694025',
    lon: '-71.797928',
  },
  Chad: { code: 'TD', lat: '15.454166', lon: '18.732207' },
  'French Southern Territories': {
    code: 'TF',
    lat: '-49.280366',
    lon: '69.348557',
  },
  Togo: { code: 'TG', lat: '8.619543', lon: '0.824782' },
  Thailand: { code: 'TH', lat: '15.870032', lon: '100.992541' },
  Tajikistan: { code: 'TJ', lat: '38.861034', lon: '71.276093' },
  Tokelau: { code: 'TK', lat: '-8.967363', lon: '-171.855881' },
  'Timor-Leste': { code: 'TL', lat: '-8.874217', lon: '125.727539' },
  Turkmenistan: { code: 'TM', lat: '38.969719', lon: '59.556278' },
  Tunisia: { code: 'TN', lat: '33.886917', lon: '9.537499' },
  Tonga: { code: 'TO', lat: '-21.178986', lon: '-175.198242' },
  Turkey: { code: 'TR', lat: '38.963745', lon: '35.243322' },
  'Trinidad and Tobago': { code: 'TT', lat: '10.691803', lon: '-61.222503' },
  Tuvalu: { code: 'TV', lat: '-7.109535', lon: '177.64933' },
  Taiwan: { code: 'TW', lat: '23.69781', lon: '120.960515' },
  Tanzania: { code: 'TZ', lat: '-6.369028', lon: '34.888822' },
  Ukraine: { code: 'UA', lat: '48.379433', lon: '31.16558' },
  Uganda: { code: 'UG', lat: '1.373333', lon: '32.290275' },
  'U.S. Minor Outlying Islands': { code: 'UM', lat: '', lon: '' },
  'USA': { code: 'US', lat: '37.09024', lon: '-95.712891' },
  Uruguay: { code: 'UY', lat: '-32.522779', lon: '-55.765835' },
  Uzbekistan: { code: 'UZ', lat: '41.377491', lon: '64.585262' },
  'Vatican City': { code: 'VA', lat: '41.902916', lon: '12.453389' },
  'Saint Vincent and the Grenadines': {
    code: 'VC',
    lat: '12.984305',
    lon: '-61.287228',
  },
  Venezuela: { code: 'VE', lat: '6.42375', lon: '-66.58973' },
  'British Virgin Islands': { code: 'VG', lat: '18.420695', lon: '-64.639968' },
  'U.S. Virgin Islands': { code: 'VI', lat: '18.335765', lon: '-64.896335' },
  Vietnam: { code: 'VN', lat: '14.058324', lon: '108.277199' },
  Vanuatu: { code: 'VU', lat: '-15.376706', lon: '166.959158' },
  'Wallis and Futuna': { code: 'WF', lat: '-13.768752', lon: '-177.156097' },
  Samoa: { code: 'WS', lat: '-13.759029', lon: '-172.104629' },
  Kosovo: { code: 'XK', lat: '42.602636', lon: '20.902977' },
  Yemen: { code: 'YE', lat: '15.552727', lon: '48.516388' },
  Mayotte: { code: 'YT', lat: '-12.8275', lon: '45.166244' },
  'South Africa': { code: 'ZA', lat: '-30.559482', lon: '22.937506' },
  Zambia: { code: 'ZM', lat: '-13.133897', lon: '27.849332' },
  Zimbabwe: { code: 'ZW', lat: '-19.015438', lon: '29.154857' },
};
