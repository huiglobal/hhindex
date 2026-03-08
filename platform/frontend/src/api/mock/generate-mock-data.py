#!/usr/bin/env python3
"""
Generate comprehensive mock data for Hindu Hate Index platform
Creates JSON files with 100+ incidents and related data
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

# Taxonomy categories with distribution percentages
TAXONOMY_CATEGORIES = {
    "Religious Persecution": 0.20,
    "Civilizational Attacks": 0.15,
    "Cultural Suppression": 0.12,
    "Indigenous Knowledge Dismissal": 0.08,
    "Political Weaponization": 0.15,
    "Anti-India as Anti-Hindu Proxy": 0.10,
    "Digital and Ideological Warfare": 0.12,
    "Cultural Appropriation": 0.08
}

# Geographic distribution
REGIONS = {
    "India": {
        "weight": 0.40,
        "states": ["Maharashtra", "Uttar Pradesh", "West Bengal", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Kerala"],
        "cities": {
            "Maharashtra": [("Mumbai", 19.0760, 72.8777), ("Pune", 18.5204, 73.8567)],
            "Uttar Pradesh": [("Lucknow", 26.8467, 80.9462), ("Varanasi", 25.3176, 82.9739)],
            "West Bengal": [("Kolkata", 22.5726, 88.3639), ("Siliguri", 26.7271, 88.3953)],
            "Karnataka": [("Bangalore", 12.9716, 77.5946), ("Mysore", 12.2958, 76.6394)],
            "Tamil Nadu": [("Chennai", 13.0827, 80.2707), ("Coimbatore", 11.0168, 76.9558)],
            "Gujarat": [("Ahmedabad", 23.0225, 72.5714), ("Surat", 21.1702, 72.8311)],
            "Rajasthan": [("Jaipur", 26.9124, 75.7873), ("Udaipur", 24.5854, 73.7125)],
            "Kerala": [("Thiruvananthapuram", 8.5241, 76.9366), ("Kochi", 9.9312, 76.2673)]
        }
    },
    "Pakistan": {
        "weight": 0.15,
        "states": ["Sindh", "Punjab", "Balochistan"],
        "cities": {
            "Sindh": [("Karachi", 24.8607, 67.0011), ("Umerkot", 25.3549, 69.7369)],
            "Punjab": [("Lahore", 31.5497, 74.3436), ("Faisalabad", 31.4504, 73.1350)],
            "Balochistan": [("Quetta", 30.1798, 66.9750)]
        }
    },
    "Bangladesh": {
        "weight": 0.10,
        "states": ["Dhaka Division", "Chittagong Division", "Sylhet Division"],
        "cities": {
            "Dhaka Division": [("Dhaka", 23.8103, 90.4125)],
            "Chittagong Division": [("Chittagong", 22.3569, 91.7832)],
            "Sylhet Division": [("Sylhet", 24.8949, 91.8687)]
        }
    },
    "USA": {
        "weight": 0.10,
        "states": ["California", "New York", "Texas", "New Jersey"],
        "cities": {
            "California": [("Los Angeles", 34.0522, -118.2437), ("San Francisco", 37.7749, -122.4194)],
            "New York": [("New York City", 40.7128, -74.0060)],
            "Texas": [("Houston", 29.7604, -95.3698), ("Dallas", 32.7767, -96.7970)],
            "New Jersey": [("Jersey City", 40.7178, -74.0431)]
        }
    },
    "UK": {
        "weight": 0.10,
        "states": ["England", "Scotland"],
        "cities": {
            "England": [("London", 51.5074, -0.1278), ("Birmingham", 52.4862, -1.8904), ("Leicester", 52.6369, -1.1398)],
            "Scotland": [("Glasgow", 55.8642, -4.2518)]
        }
    },
    "Canada": {
        "weight": 0.05,
        "states": ["Ontario", "British Columbia"],
        "cities": {
            "Ontario": [("Toronto", 43.6532, -79.3832), ("Ottawa", 45.4215, -75.6972)],
            "British Columbia": [("Vancouver", 49.2827, -123.1207)]
        }
    },
    "Australia": {
        "weight": 0.03,
        "states": ["New South Wales", "Victoria"],
        "cities": {
            "New South Wales": [("Sydney", -33.8688, 151.2093)],
            "Victoria": [("Melbourne", -37.8136, 144.9631)]
        }
    },
    "Nepal": {
        "weight": 0.03,
        "states": ["Bagmati Province"],
        "cities": {
            "Bagmati Province": [("Kathmandu", 27.7172, 85.3240)]
        }
    },
    "Sri Lanka": {
        "weight": 0.02,
        "states": ["Western Province"],
        "cities": {
            "Western Province": [("Colombo", 6.9271, 79.8612)]
        }
    },
    "Malaysia": {
        "weight": 0.02,
        "states": ["Selangor"],
        "cities": {
            "Selangor": [("Kuala Lumpur", 3.1390, 101.6869)]
        }
    }
}

# Incident templates by taxonomy category
INCIDENT_TEMPLATES = {
    "Religious Persecution": [
        ("Temple Vandalism in {city}", "A Hindu temple was vandalized with graffiti and broken idols. Local authorities are investigating.", 7, 9),
        ("Forced Conversion Attempt in {city}", "A Hindu family reported being pressured to convert. Authorities were slow to respond.", 8, 10),
        ("Discrimination in Employment", "Hindu employee faced workplace discrimination based on religious identity.", 5, 7),
        ("Temple Desecration", "Sacred texts and religious artifacts were damaged in a temple attack.", 7, 9),
        ("Hate Speech at Public Gathering", "Anti-Hindu hate speech was delivered at a public event without intervention.", 6, 8)
    ],
    "Civilizational Attacks": [
        ("Academic Paper Misrepresents Hindu Philosophy", "Research paper characterizes Vedanta as 'primitive mysticism' ignoring its contributions.", 5, 7),
        ("Textbook Erases Hindu Contributions", "History textbook omits Hindu contributions to mathematics and astronomy.", 6, 8),
        ("Media Misrepresents Hindu Scriptures", "News article grossly mischaracterizes Bhagavad Gita teachings.", 5, 7),
        ("Documentary Distorts Hindu History", "Film presents colonial narrative of Hindu civilization as 'backward'.", 6, 8)
    ],
    "Cultural Suppression": [
        ("Festival Celebration Restricted", "Local authorities imposed unreasonable restrictions on Diwali celebrations.", 5, 7),
        ("Sanskrit Program Cancelled", "University cancelled Sanskrit language program citing 'lack of relevance'.", 5, 7),
        ("Cultural Event Disrupted", "Hindu cultural event was disrupted by protesters.", 6, 8),
        ("Traditional Dress Mocked", "Hindu traditional attire was mocked in mainstream media.", 4, 6)
    ],
    "Indigenous Knowledge Dismissal": [
        ("Ayurveda Dismissed as Pseudoscience", "Medical journal categorically dismisses Ayurveda without acknowledging documented efficacy.", 5, 7),
        ("Yoga Origins Denied", "Article claims yoga has 'no religious origins' despite Hindu roots.", 4, 6),
        ("Traditional Knowledge Appropriated", "Pharmaceutical company patents traditional Hindu medicinal formula without attribution.", 6, 8),
        ("Vastu Shastra Ridiculed", "Architecture journal mocks Vastu principles as 'superstition'.", 4, 6)
    ],
    "Political Weaponization": [
        ("Hindu Advocacy Labeled as Extremism", "Legitimate Hindu advocacy organization labeled as 'extremist' by media.", 6, 8),
        ("Hindutva Used as Slur", "Political discourse uses 'Hindutva' as blanket pejorative to silence Hindu voices.", 5, 7),
        ("Hindu Politician Targeted", "Hindu political candidate faces disproportionate scrutiny based on religious identity.", 5, 7),
        ("Community Concerns Dismissed", "Hindu community safety concerns dismissed as 'manufactured victimhood'.", 5, 7)
    ],
    "Anti-India as Anti-Hindu Proxy": [
        ("Disproportionate Criticism of India", "Media coverage of India disproportionately negative compared to similar nations.", 5, 7),
        ("Indian Business Targeted", "Indian-owned business boycotted using anti-Hindu rhetoric.", 6, 8),
        ("India's Rise Framed as Threat", "Article frames India's economic growth as 'Hindu nationalist threat'.", 5, 7),
        ("Caste Narrative Weaponized", "Caste issues used to delegitimize all Hindu advocacy.", 6, 8)
    ],
    "Digital and Ideological Warfare": [
        ("Coordinated Social Media Campaign", "Organized campaign spreads anti-Hindu misinformation across platforms.", 7, 9),
        ("Wikipedia Bias Documented", "Systematic bias in Wikipedia articles about Hindu topics.", 5, 7),
        ("Algorithmic Amplification of Hate", "Platform algorithms amplify anti-Hindu content disproportionately.", 6, 8),
        ("Online Harassment Campaign", "Hindu activists targeted with coordinated online harassment.", 7, 9)
    ],
    "Cultural Appropriation": [
        ("Yoga Studio Appropriates Symbols", "Commercial studio uses Om and Hindu deities while denying Hindu origins.", 4, 6),
        ("Fashion Brand Misuses Sacred Symbols", "Clothing line uses Hindu deities on inappropriate items.", 5, 7),
        ("Music Festival Appropriates Mantras", "Event uses Sanskrit mantras as 'exotic background music'.", 4, 6),
        ("Wellness Brand Decontextualizes Practices", "Company markets Hindu practices stripped of cultural context.", 4, 6)
    ]
}

def generate_incident_id(index: int) -> str:
    """Generate incident ID"""
    return f"INC-2024-{index:03d}"

def generate_date(days_ago_range: tuple) -> str:
    """Generate random date within range"""
    days_ago = random.randint(days_ago_range[0], days_ago_range[1])
    date = datetime.now() - timedelta(days=days_ago)
    return date.isoformat() + "Z"

def select_location() -> Dict[str, Any]:
    """Select random location based on geographic distribution"""
    country = random.choices(
        list(REGIONS.keys()),
        weights=[r["weight"] for r in REGIONS.values()]
    )[0]
    
    region_data = REGIONS[country]
    state = random.choice(region_data["states"])
    city_data = random.choice(region_data["cities"][state])
    
    return {
        "country": country,
        "state": state,
        "city": city_data[0],
        "coordinates": {
            "lat": city_data[1],
            "lng": city_data[2]
        }
    }

def generate_incidents(count: int = 120) -> List[Dict[str, Any]]:
    """Generate incident records"""
    incidents = []
    
    # Calculate incidents per category
    category_counts = {
        cat: int(count * weight)
        for cat, weight in TAXONOMY_CATEGORIES.items()
    }
    
    incident_index = 1
    
    for category, cat_count in category_counts.items():
        templates = INCIDENT_TEMPLATES[category]
        
        for i in range(cat_count):
            template = random.choice(templates)
            location = select_location()
            
            # Generate dates (70% recent, 30% older)
            if random.random() < 0.7:
                date = generate_date((0, 90))  # Last 90 days
            else:
                date = generate_date((91, 365))  # Older
            
            severity = random.randint(template[2], template[3])
            
            # Verification status
            status_choice = random.random()
            if status_choice < 0.70:
                status = "verified"
            elif status_choice < 0.90:
                status = "pending"
            else:
                status = "flagged"
            
            # Escalation risk
            if severity >= 8:
                escalation_risk = random.choice(["high", "critical"])
            elif severity >= 6:
                escalation_risk = random.choice(["medium", "high"])
            else:
                escalation_risk = random.choice(["low", "medium"])
            
            # Campaign association (15% of incidents)
            is_campaign = random.random() < 0.15
            campaign_id = f"CMP-{random.randint(1, 10):03d}" if is_campaign else None
            
            incident = {
                "id": generate_incident_id(incident_index),
                "title": template[0].format(city=location["city"]),
                "description": template[1],
                "date": date,
                "location": location,
                "incidentType": category.lower().replace(" ", "_"),
                "taxonomyCategory": category,
                "severity": severity,
                "status": status,
                "classification": {
                    "verificationScore": random.randint(75, 95),
                    "confidence": random.randint(70, 90),
                    "details": [
                        {
                            "category": category,
                            "severity": severity,
                            "reasoning": f"Incident classified as {category} based on content analysis"
                        }
                    ]
                },
                "impactAssessment": {
                    "social": f"Impact on {location['city']} Hindu community",
                    "psychological": "Increased anxiety and concern",
                    "safety": "Security assessment ongoing",
                    "escalationRisk": escalation_risk,
                    "escalationReasoning": f"Risk level {escalation_risk} based on severity and context",
                    "patterns": [category, "Regional pattern"],
                    "geographicSpread": random.choice(["Local", "Regional", "National", "International"]),
                    "relatedIncidents": []
                },
                "sources": [
                    {
                        "id": f"SRC-{random.randint(1, 50):03d}",
                        "name": random.choice(["Local News", "National Media", "Community Report", "Official Report"]),
                        "url": f"https://example.com/source/{incident_index}",
                        "credibilityScore": random.randint(70, 95),
                        "type": random.choice(["news", "social_media", "official_report", "community"])
                    }
                ],
                "evidence": [],
                "tags": [category.lower().replace(" ", "-"), location["country"].lower(), location["city"].lower()],
                "createdAt": date,
                "updatedAt": date,
                "verifiedBy": f"MOD-{random.randint(1, 5):03d}" if status == "verified" else None,
                "verifiedAt": date if status == "verified" else None,
                "isCoordinatedCampaign": is_campaign,
                "campaignId": campaign_id,
                "detectedBy": random.choice(["monitoring_bot", "community_submission", "media_scan"]),
                "detectionTimestamp": date
            }
            
            incidents.append(incident)
            incident_index += 1
    
    return incidents

def save_json(data: Dict[str, Any], filename: str):
    """Save data to JSON file"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Generated {filename}")

if __name__ == "__main__":
    import os
    
    # Ensure data directory exists
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)
    
    # Generate incidents
    incidents = generate_incidents(120)
    save_json({"incidents": incidents}, os.path.join(data_dir, "incidents.json"))
    print(f"Generated {len(incidents)} incidents")
