#!/usr/bin/env python3
"""Generate offenders.json and heatmap.json"""

import json
import random
import os
from datetime import datetime, timedelta

def save_json(data, filename):
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    filepath = os.path.join(data_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Generated {filepath}")

def generate_offenders():
    """Generate offenders.json"""
    offenders = []
    
    for i in range(50):
        offender = {
            "id": f"OFF-AUTH-{i+1:03d}",
            "type": random.choice(["author", "publication"]),
            "name": f"Offender {chr(65 + i % 26)} {i+1}",
            "totalIncidents": random.randint(5, 50),
            "averageSeverity": round(random.uniform(5.5, 8.5), 1),
            "firstIncident": "2023-01-15",
            "lastIncident": "2024-03-05",
            "activityHistory": [
                {
                    "month": f"2024-{m:02d}",
                    "incidents": random.randint(1, 8),
                    "averageSeverity": round(random.uniform(6.0, 8.0), 1)
                }
                for m in range(1, 4)
            ],
            "incidentTimeline": [
                {
                    "incidentId": f"INC-2024-{random.randint(1, 118):03d}",
                    "date": (datetime.now() - timedelta(days=random.randint(1, 90))).isoformat() + "Z",
                    "severity": random.randint(5, 9),
                    "type": random.choice(["political_weaponization", "civilizational_attacks", "digital_ideological_warfare"])
                }
                for _ in range(random.randint(3, 10))
            ],
            "patternAnalysis": {
                "primaryTypes": random.sample(["political_weaponization", "civilizational_attacks", "digital_ideological_warfare", "cultural_suppression"], k=2),
                "targetRegions": random.sample(["India", "USA", "UK", "Pakistan"], k=random.randint(1, 3)),
                "postingFrequency": f"{round(random.uniform(0.5, 5.0), 1)} per week",
                "escalationTrend": random.choice(["increasing", "stable", "decreasing"])
            },
            "historicalRankings": [
                {
                    "date": f"2024-{m:02d}-01",
                    "rank": random.randint(1, 50),
                    "leaderboardType": "authors"
                }
                for m in range(1, 4)
            ],
            "recidivismScore": random.randint(60, 95),
            "platforms": random.sample(["Twitter", "Blog", "YouTube", "Facebook", "TikTok"], k=random.randint(2, 4))
        }
        offenders.append(offender)
    
    return {"offenders": offenders}

def generate_heatmap():
    """Generate heatmap.json"""
    # Major cities coordinates
    cities = [
        (19.0760, 72.8777, "Mumbai"),
        (28.7041, 77.1025, "Delhi"),
        (22.5726, 88.3639, "Kolkata"),
        (13.0827, 80.2707, "Chennai"),
        (12.9716, 77.5946, "Bangalore"),
        (24.8607, 67.0011, "Karachi"),
        (31.5497, 74.3436, "Lahore"),
        (23.8103, 90.4125, "Dhaka"),
        (40.7128, -74.0060, "New York"),
        (34.0522, -118.2437, "Los Angeles"),
        (51.5074, -0.1278, "London"),
        (52.4862, -1.8904, "Birmingham"),
        (43.6532, -79.3832, "Toronto"),
        (-33.8688, 151.2093, "Sydney"),
        (27.7172, 85.3240, "Kathmandu"),
        (6.9271, 79.8612, "Colombo"),
        (3.1390, 101.6869, "Kuala Lumpur")
    ]
    
    data_points = []
    for lat, lng, city in cities:
        # Add some random variation
        for _ in range(random.randint(3, 10)):
            data_points.append({
                "lat": lat + random.uniform(-0.5, 0.5),
                "lng": lng + random.uniform(-0.5, 0.5),
                "intensity": round(random.uniform(0.3, 1.0), 2),
                "metadata": {
                    "regionId": f"REG-{city[:3].upper()}",
                    "incidentCount": random.randint(5, 50),
                    "averageSeverity": round(random.uniform(5.5, 8.0), 1),
                    "primaryTypes": random.sample(["religious_persecution", "cultural_suppression", "political_weaponization"], k=2),
                    "timePeriod": "2024-01-01_2024-03-08"
                }
            })
    
    return {
        "dataPoints": data_points,
        "timePeriods": {
            "7d": data_points[:len(data_points)//5],
            "30d": data_points[:len(data_points)//3],
            "90d": data_points[:len(data_points)//2],
            "1y": data_points,
            "all": data_points
        },
        "layers": {
            "origin": data_points,
            "target": data_points
        }
    }

if __name__ == "__main__":
    print("Generating offenders...")
    offenders = generate_offenders()
    save_json(offenders, "offenders.json")
    
    print("\nGenerating heatmap...")
    heatmap = generate_heatmap()
    save_json(heatmap, "heatmap.json")
    
    print("\n✅ All remaining mock data files generated!")
