import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import styles from "./CustomerMap.module.css";

const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function CustomerMap() {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Customer by Country</h3>

            <div className={styles.mapLayout}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 170,
                        center: [78, 22],
                    }}
                    className={styles.map}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isActive = geo.properties.name === "India";
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        style={{
                                            default: {
                                                fill: isActive ? "#7B61FF" : "#E6E8F0",
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: isActive ? "#6A52E0" : "#D6D9E6",
                                                outline: "none",
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
                        <p className={styles.statValue}>India</p>
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
