

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import serviceData from "@/app/data/services.json";
import Swal from "sweetalert2";

export default function BeRider() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [phone, setPhone] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    const filteredDistricts = serviceData
      .filter((item) => item.region === region)
      .map((item) => item.district)
      .filter((v, i, a) => a.indexOf(v) === i);
    setDistricts(filteredDistricts);
    setSelectedDistrict("");
    setCities([]);
    setSelectedCity("");
    setAreas([]);
    setSelectedArea("");
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const filteredCities = serviceData
      .filter((item) => item.district === district)
      .map((item) => item.city);
    setCities(filteredCities);
    setSelectedCity("");
    setAreas([]);
    setSelectedArea("");
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    const filteredAreaObj = serviceData.find(
      (item) => item.city === city && item.district === selectedDistrict
    );
    setAreas(filteredAreaObj ? filteredAreaObj.covered_area : []);
    setSelectedArea("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !selectedRegion || !selectedDistrict || !selectedCity || !selectedArea) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please fill all fields!",
      });
      return;
    }

    const payload = {
      name: user.name,
      email: user.email,
      phone,
      region: selectedRegion,
      district: selectedDistrict,
      city: selectedCity,
      covered_area: selectedArea,
      role: "user",
      status: "pending",
    };

    try {
      const res = await fetch("/api/riders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Rider request submitted! Wait for admin approval.",
        });

        setPhone("");
        setSelectedRegion("");
        setSelectedDistrict("");
        setSelectedCity("");
        setSelectedArea("");
        setDistricts([]);
        setCities([]);
        setAreas([]);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to submit request.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong.",
      });
    }
  };

  if (status !== "authenticated")
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Please login first.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-600">
        Become a Rider
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Email */}
        <input
          type="text"
          value={user.name}
          disabled
          className="input input-bordered w-full bg-green-50 font-semibold text-green-900 cursor-not-allowed"
        />
        <input
          type="email"
          value={user.email}
          disabled
          className="input input-bordered w-full bg-green-50 font-semibold text-green-900 cursor-not-allowed"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered w-full focus:ring-2 focus:ring-green-400"
        />

        {/* Location Dropdowns */}
        <select
          value={selectedRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="select select-bordered w-full focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Region</option>
          {Array.from(new Set(serviceData.map((item) => item.region))).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          disabled={!selectedRegion}
          className="select select-bordered w-full focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={!selectedDistrict}
          className="select select-bordered w-full focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          disabled={!selectedCity}
          className="select select-bordered w-full focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="btn w-full bg-gradient-to-r from-green-400 to-green-600 border-0 hover:scale-105 transition-transform duration-300 text-white font-bold"
        >
          Submit Rider Request
        </button>
      </form>
    </div>
  );
}
