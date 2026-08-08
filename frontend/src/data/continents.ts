const CONTINENT_GROUPS: Record<string, string[]> = {
  Africa: [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
    'Cameroon', 'Central African Republic', 'Chad', 'Congo',
    'Dem. Rep. Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea',
    'eSwatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
    'Guinea-Bissau', "Ivory Coast", 'Kenya', 'Lesotho', 'Liberia', 'Libya',
    'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Morocco', 'Mozambique',
    'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Senegal', 'Sierra Leone',
    'Somalia', 'Somaliland', 'South Africa', 'S. Sudan', 'Sudan',
    'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'W. Sahara', 'Zambia',
    'Zimbabwe',
  ],
  Asia: [
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh',
    'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India',
    'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan',
    'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos',
    'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal',
    'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar',
    'Saudi Arabia', 'Singapore', 'Sri Lanka', 'Syria', 'Taiwan',
    'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan',
    'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen',
  ],
  Europe: [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium',
    'Bosnia and Herz.', 'Bulgaria', 'Croatia', 'Czechia', 'Denmark',
    'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro',
    'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal',
    'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom',
    'Vatican',
  ],
  'North America': [
    'Antigua and Barb.', 'Bahamas', 'Barbados', 'Belize', 'Canada',
    'Costa Rica', 'Cuba', 'Dominica', 'Dominican Rep.', 'El Salvador',
    'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico',
    'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Trinidad and Tobago',
    'United States of America', 'Greenland',
  ],
  'South America': [
    'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador',
    'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela',
    'Falkland Is.',
  ],
  Oceania: [
    'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia',
    'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa',
    'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu', 'New Caledonia',
    'French Polynesia',
  ],
}

const COUNTRY_TO_CONTINENT: Record<string, string> = {}
for (const [continent, countries] of Object.entries(CONTINENT_GROUPS)) {
  for (const country of countries) {
    COUNTRY_TO_CONTINENT[country] = continent
  }
}

export function getContinent(countryName: string): string {
  const continent = COUNTRY_TO_CONTINENT[countryName]
  if (!continent) {
    console.warn(
      `[continents] No continent mapping for "${countryName}" — add it to src/data/continents.ts`
    )
    return 'Unknown'
  }
  return continent
}

export const CONTINENT_NAMES = Object.keys(CONTINENT_GROUPS)