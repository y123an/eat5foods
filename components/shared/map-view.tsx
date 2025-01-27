'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { handleError } from '@/lib/toast-util'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Search } from "lucide-react"
import React, { ReactNode, useCallback, useRef, useState } from 'react'

interface MapViewProps {
    onLocationSelect: (address: Address) => void;
    children?: ReactNode,
    googleMapsApiKey: string
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

const MapView: React.FC<MapViewProps> = ({ onLocationSelect, children, googleMapsApiKey }) => {
    const [isWideView, setIsWideView] = useState<boolean>(false)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [center, setCenter] = useState<{ lat: number, lng: number }>({ lat: -3.745, lng: -38.523 })
    const [address, setAddress] = useState<Address | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey
    })

    const containerStyle = {
        width: isWideView ? '70vw' : '100%',
        height: isWideView ? '70vh' : '400px'
    }

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [center])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const toggleView = () => {
        setIsWideView(!isWideView)
    }

    const handleSearch = () => {
        if (searchQuery.trim() === '') return

        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ address: searchQuery }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const { lat, lng } = results[0].geometry.location
                setCenter({ lat: lat(), lng: lng() })
                parseAddressComponents(results[0].address_components)
                if (map) {
                    map.panTo({ lat: lat(), lng: lng() })
                    map.setZoom(15)
                }
            } else {
                handleError('Geocode was not successful for the following reason: ' + status, "fetch")
            }
        })
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    parseAddressComponents(results[0].address_components)
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }

    const parseAddressComponents = (components: google.maps.GeocoderAddressComponent[]) => {
        let street = '', city = '', state = '', zipCode = '', country = '';

        components.forEach(component => {
            const types = component.types;

            if (types.includes('street_number') || types.includes('route')) {
                street += component.long_name + ' ';
            } else if (types.includes('locality')) {
                city = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
                state = component.long_name;
            } else if (types.includes('postal_code')) {
                zipCode = component.long_name;
            } else if (types.includes('country')) {
                country = component.long_name;
            }
        });

        const newAddress = { street: street.trim(), city, state, zipCode, country };
        setAddress(newAddress);
        onLocationSelect(newAddress);
        setIsOpen(false);
    }

    if (loadError) return <div>Error loading maps</div>
    if (!isLoaded) return <div>Loading...</div>

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[80vw]">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Map View</h2>
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            ref={searchInputRef}
                            placeholder="Search for a location"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch}>
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    {address && (
                        <div className="text-sm font-medium">
                            Location: {`${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`}
                        </div>
                    )}
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onClick={handleMapClick}
                        onUnmount={onUnmount}
                    >
                        <Marker position={center} />
                    </GoogleMap>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(MapView)