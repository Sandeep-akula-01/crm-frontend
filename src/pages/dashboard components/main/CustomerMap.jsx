import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import styles from "./CustomerMap.module.css";

const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const indiaGeoUrl =
    "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

export default function CustomerMap() {
    const [view, setView] = useState("world");

    const crmStates = [
        "Telangana",
        "Andhra Pradesh",
        "Tamil Nadu",
        "Karnataka"
    ];

    return (
        <div className={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className={styles.title}>Customer by Country</h3>
                {view === "india" && (
                    <button
                        onClick={() => setView("world")}
                        style={{
                            fontSize: "12px",
                            marginBottom: "6px",
                            background: "none",
                            border: "none",
                            color: "#000080",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        ← Back to World
                    </button>
                )}
            </div>

            <div className={styles.mapLayout}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={
                        view === "world"
                            ? { scale: 170, center: [78, 22] }
                            : { scale: 1200, center: [78.5, 22] }
                    }
                    className={styles.map}
                >
                    <Geographies
                        key={view}
                        geography={view === "world" ? geoUrl : indiaGeoUrl}
                    >
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isIndia = geo.properties.name === "India";

                                // Using NAME_1 property for states in GeoJSON
                                const stateName = geo.properties.NAME_1 || geo.properties.name || "";

                                const isActiveState = crmStates.some(
                                    s => s.toLowerCase() === stateName.toLowerCase()
                                );

                                const fill = view === "world"
                                    ? (isIndia ? "#000080" : "#E6E8F0")
                                    : (isActiveState ? "#000080" : "#E6E8F0");

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => {
                                            if (isIndia && view === "world") setView("india");
                                        }}
                                        style={{
                                            default: {
                                                fill: fill,
                                                outline: "none",
                                                cursor: isIndia && view === "world" ? "pointer" : "default"
                                            },
                                            hover: {
                                                fill: view === "world" && isIndia ? "#000066" : (view === "india" && isActiveState ? "#000066" : (fill === "#E6E8F0" ? "#D6D9E6" : fill)),
                                                outline: "none",
                                                cursor: (isIndia && view === "world") || (view === "india") ? "pointer" : "default"
                                            },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>

                <div className={styles.statsColumn}>
                    <div className={styles.statBox}>
                        <p className={styles.statValue}>28,500</p>
                        <p className={styles.statLabel}>Total Customers</p>
                    </div>

                    <div className={styles.statBox}>
                        <p className={styles.statValue}>{view === "india" ? "Telangana" : "India"}</p>
                        <p className={styles.statLabel}>Top Region</p>
                    </div>

                    <div className={styles.statBox}>
                        <p className={styles.statValue}>+12%</p>
                        <p className={styles.statLabel}>Growth</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
