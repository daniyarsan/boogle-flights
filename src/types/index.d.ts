export type NavBarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
};

export type ApiResponseSuccess<T> = {
  status: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
  itineraries?: [];
};

export type ApiResponseError = {
  status: false;
  message: string;
  errors: string[];
};

export type ApiResponse<T> = ApiResponseError | ApiResponseSuccess<T>;

export interface SelectOption<T = string> {
  id: T;
  label: string;
}

interface SelectorProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (val: T) => void;
}

export type Presentation = {
  title: "New York John F. Kennedy";
  suggestionTitle: "New York John F. Kennedy (JFK)";
  subtitle: "United States";
};
export type Navigation = {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: {
    skyId: string;
    entityId: string;
    flightPlaceType: string;
    localizedName: string;
  };
  relevantHotelParams: {
    entityId: string;
    entityType: string;
    localizedName: string;
  };
};

export type Airport = {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
};

type SearchFlightsQuery = {
  originEntityId: string;
  originSkyId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: string;
};

type FlightPlaceType = "City" | "Airport";

interface FlightPlaceParent {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: FlightPlaceType;
}

interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent?: FlightPlaceParent;
  name: string;
  type: FlightPlaceType;
  country: string;
}

interface Carrier {
  id: number;
  alternateId: string;
  logoUrl?: string;
  name: string;
}

interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

interface Segment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string; // ISO date string
  arrival: string; // ISO date string
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: OperatingCarrier;
}

interface Carriers {
  marketing: Carrier[];
  operationType: string;
}

interface Leg {
  id: string;
  origin: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    entityId: string;
    name: string;
    displayCode: string;
    city: string;
    country: string;
    isHighlighted: boolean;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string; // ISO date string
  arrival: string; // ISO date string
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

interface Eco {
  ecoContenderDelta: number;
}

export interface FlightItem {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  eco: Eco;
  fareAttributes: Record<string, unknown>;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}
