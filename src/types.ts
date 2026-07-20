/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'es' | 'ar' | 'hi' | 'zh';

export interface ProductDetails {
  origin: string;
  packaging: string;
  moq: string;
  grade: string;
  loadingCapacity: string;
}

export interface Product {
  id: string;
  category: 'grains' | 'spices' | 'dry_fruits' | 'fresh_produce';
  name: Record<Language, string>;
  description: Record<Language, string>;
  image: string;
  details: Record<Language, ProductDetails>;
  specifications: Record<Language, string[]>;
}

export interface ShippingPort {
  id: string;
  name: string;
  country: Record<Language, string>;
  coords: { x: number; y: number }; // Percentage coords mapped to standard 1000x500 box
}

export interface ShippingRoute {
  id: string;
  origin: string; // Port ID
  destination: string; // Port ID
  vesselName: string;
  cargo: Record<Language, string>;
  transitDays: number;
  isActive: boolean;
}

export type ShipmentStatus = 'processing' | 'customs' | 'loaded' | 'transit' | 'discharging' | 'delivered';

export interface TrackingMilestone {
  status: ShipmentStatus;
  date: string;
  location: string;
  description: Record<Language, string>;
  completed: boolean;
}

export interface Shipment {
  trackingId: string;
  commodity: Record<Language, string>;
  vesselName: string;
  containerId: string;
  containerType: 'Reefer (20ft)' | 'Reefer (40ft)' | 'Dry FCL (20ft)' | 'Dry FCL (40ft)';
  status: ShipmentStatus;
  originPort: Record<Language, string>;
  destinationPort: Record<Language, string>;
  departureDate: string;
  arrivalDate: string;
  temperature: string; // Reefer stats, e.g. "4.2 °C"
  humidity: string; // Reefer stats, e.g. "65%"
  currentLat: number;
  currentLng: number;
  milestones: TrackingMilestone[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  country: string;
  productSelect: string;
  trackingNum: string;
  message: string;
  timestamp: string;
}
