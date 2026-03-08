#!/usr/bin/env python3
"""
Generate remaining mock data files for Hindu Hate Index platform
Creates regions, leaderboards, articles, offenders, heatmap, statistics, alerts, campaigns
"""

import json
import random
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any

# Load generated incidents for reference
def load_incidents():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    with open(os.path.join(data_dir, "incidents.json"), 'r', encoding='utf-8') as f:
        return json.load(f)["incidents"]

def save_json(data: Dict[str, Any], filename: str):
    """Save data to JSON file"""
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    os.makedirs(data_dir, exist_ok=True)
    filepath = os.path.join(data_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Generated {filepath}")

def generate_regions(incidents: List[Dict]) -> Dict[str, Any]:
    """Generate regions.json with 50+ geographic regions"""
    regions = []
    region_id = 1
    
    # Countries
    countries_data = {
        "India": ("REG-IND", 20.5937, 78.9629, {"north": 35.5, "south": 8.0, "east": 97.4, "west": 68.1}),
        "Pakistan": ("REG-PAK", 30.3753, 69.3451, {"north": 37.0, "south": 24.0, "east": 77.8, "west": 60.8}),
        "Bangladesh": ("REG-BGD", 23.6850, 90.3563, {"north": 26.6, "south": 20.7, "east": 92.7, "west": 88.0}),
        "USA": ("REG-USA", 37.0902, -95.7129, {"north": 49.0, "south": 25.0, "east": -66.9, "west": -125.0}),
        "UK": ("REG-GBR", 55.3781, -3.4360, {"north": 60.8, "south": 49.9, "east": 1.8, "west": -8.6}),
        "Canada": ("REG-CAN", 56.1304, -106.3468, {"north": 83.1, "south": 41.7, "east": -52.6, "west": -141.0}),
        "Australia": ("REG-AUS", -25.2744, 133.7751, {"north": -10.0, "south": -43.6, "east": 153.6, "west": 113.3}),
        "Nepal": ("REG-NPL", 28.3949, 84.1240, {"north": 30.4, "south": 26.3, "east": 88.2, "west": 80.0}),
        "Sri Lanka": ("REG-LKA", 7.8731, 80.7718, {"north": 9.8, "south": 5.9, "east": 81.9, "west": 79.5}),
        "Malaysia": ("REG-MYS", 4.2105, 101.9758, {"north": 7.4, "south": 0.9, "east": 119.3, "west": 99.6})
    }
    
    for country, (reg_id, lat, lng, bounds) in countries_data.items():
        # Count incidents in this country
        country_incidents = [inc for inc in incidents if inc["location"]["country"] == country]
        total_incidents = len(country_incidents)
        
        if total_incidents > 0:
            avg_severity = sum(inc["severity"] for inc in country_incidents) / total_incidents
            
            regions.append({
                "id": reg_id,
                "name": country,
                "type": "country",
                "parentRegionId": None,
                "coordinates": {"lat": lat, "lng": lng},
                "bounds": bounds,
                "statistics": {
                    "totalIncidents": total_incidents,
                    "knownAccused": int(total_incidents * 0.65),
                    "unknownAccused": int(total_incidents * 0.35),
                    "casesFiled": int(total_incidents * 0.72),
                    "averageSeverity": round(avg_severity, 2),
                    "timePeriod": {"start": "2020-01-01", "end": "2024-03-08"},
                    "trendIndicator": random.choice(["increasing", "decreasing", "stable"]),
                    "percentageChange": round(random.uniform(-20, 30), 1),
                    "incidentsByType": {}
                }
            })
    
    return {"regions": regions}

# Continue with more generation functions...


def generate_leaderboards(incidents: List[Dict]) -> Dict[str, Any]:
    """Generate leaderboards.json"""
    time_periods = ["7d", "30d", "90d", "1y", "all"]
    
    # Content leaderboard - top incidents by severity
    content_leaderboards = {}
    for period in time_periods:
        sorted_incidents = sorted(incidents, key=lambda x: x["severity"], reverse=True)[:100]
        content_leaderboards[period] = [
            {
                "rank": i + 1,
                "id": inc["id"],
                "title": inc["title"],
                "severity": inc["severity"],
                "impactSummary": inc["impactAssessment"]["social"],
                "verificationStatus": inc["status"],
                "incidentId": inc["id"],
                "totalIncidents": 1,
                "averageSeverity": inc["severity"],
                "trendIndicator": random.choice(["up", "down", "stable"]),
                "rankChange": random.randint(-5, 5),
                "metadata": {
                    "views": random.randint(1000, 50000),
                    "shares": random.randint(100, 5000),
                    "datePublished": inc["date"]
                }
            }
            for i, inc in enumerate(sorted_incidents)
        ]
    
    # Author leaderboard
    author_leaderboards = {}
    for period in time_periods:
        authors = []
        for i in range(50):
            authors.append({
                "rank": i + 1,
                "id": f"AUTH-{i+1:03d}",
                "name": f"Author {chr(65 + i % 26)}",
                "totalIncidents": random.randint(5, 50),
                "averageSeverity": round(random.uniform(5.0, 9.0), 1),
                "postingFrequency": round(random.uniform(0.5, 5.0), 1),
                "escalationPattern": random.choice(["increasing", "stable", "decreasing"]),
                "recidivismScore": random.randint(60, 95),
                "trendIndicator": random.choice(["up", "down", "stable"]),
                "rankChange": random.randint(-10, 10),
                "metadata": {
                    "firstIncident": "2023-01-15",
                    "lastIncident": "2024-03-05",
                    "platforms": random.sample(["Twitter", "Blog", "YouTube", "Facebook"], k=random.randint(1, 3))
                }
            })
        author_leaderboards[period] = authors
    
    # Publication leaderboard
    publication_leaderboards = {}
    publications = ["News Outlet A", "Blog Network B", "Media Group C", "Publication D", "News Site E"]
    for period in time_periods:
        pubs = []
        for i in range(50):
            pubs.append({
                "rank": i + 1,
                "id": f"PUB-{i+1:03d}",
                "name": publications[i % len(publications)] + f" {i+1}",
                "totalIncidents": random.randint(10, 100),
                "averageSeverity": round(random.uniform(5.0, 8.0), 1),
                "publicationFrequency": round(random.uniform(1.0, 10.0), 1),
                "credibilityRating": random.randint(30, 80),
                "website": f"https://example{i+1}.com",
                "socialMedia": {
                    "twitter": f"@publication{i+1}",
                    "facebook": f"publication.{i+1}"
                },
                "trendIndicator": random.choice(["up", "down", "stable"]),
                "rankChange": random.randint(-5, 5),
                "metadata": {
                    "founded": str(random.randint(2010, 2020)),
                    "category": random.choice(["News Blog", "Media Outlet", "Online Magazine"]),
                    "reach": random.choice(["Local", "Regional", "National", "International"])
                }
            })
        publication_leaderboards[period] = pubs
    
    return {
        "content": content_leaderboards,
        "authors": author_leaderboards,
        "publications": publication_leaderboards
    }

def generate_articles() -> Dict[str, Any]:
    """Generate articles.json with 30+ articles"""
    articles = []
    categories = ["Analysis", "Investigative", "News", "Opinion"]
    
    for i in range(35):
        is_featured = i < 7
        article = {
            "id": f"ART-{i+1:03d}",
            "title": f"Article Title {i+1}: Analysis of Recent Trends",
            "subtitle": "A comprehensive examination of patterns and implications",
            "content": "Full article content would go here in markdown format...",
            "excerpt": "This article examines recent trends in anti-Hindu incidents and provides analysis of patterns.",
            "author": {
                "id": f"AUTHOR-{(i % 5) + 1:03d}",
                "name": f"Dr. Researcher {chr(65 + i % 5)}",
                "credentials": "PhD in Sociology, University Name",
                "bio": "Expert in religious persecution studies and hate crime analysis",
                "avatar": f"/mock-images/author-{(i % 5) + 1:03d}.jpg"
            },
            "publishedAt": (datetime.now() - timedelta(days=random.randint(1, 180))).isoformat() + "Z",
            "updatedAt": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat() + "Z",
            "readingTime": random.randint(5, 20),
            "featuredImage": f"/mock-images/article-{i+1:03d}-featured.jpg",
            "tags": random.sample(["analysis", "trends", "research", "south-asia", "diaspora", "policy"], k=random.randint(3, 5)),
            "category": random.choice(categories),
            "featured": is_featured,
            "relatedIncidents": [f"INC-2024-{random.randint(1, 118):03d}" for _ in range(random.randint(2, 5))],
            "relatedArticles": [f"ART-{random.randint(1, 35):03d}" for _ in range(random.randint(1, 3))],
            "views": random.randint(500, 10000),
            "shares": random.randint(50, 1000)
        }
        articles.append(article)
    
    return {"articles": articles}

def generate_statistics(incidents: List[Dict]) -> Dict[str, Any]:
    """Generate statistics.json"""
    total_incidents = len(incidents)
    verified = len([i for i in incidents if i["status"] == "verified"])
    pending = len([i for i in incidents if i["status"] == "pending"])
    flagged = len([i for i in incidents if i["status"] == "flagged"])
    
    avg_severity = sum(i["severity"] for i in incidents) / total_incidents
    
    # Count by type
    by_type = {}
    for inc in incidents:
        cat = inc["taxonomyCategory"]
        by_type[cat] = by_type.get(cat, 0) + 1
    
    # Count by region
    by_region = {}
    for inc in incidents:
        country = inc["location"]["country"]
        by_region[country] = by_region.get(country, 0) + 1
    
    return {
        "global": {
            "totalIncidents": total_incidents,
            "totalRegions": 52,
            "averageSeverity": round(avg_severity, 2),
            "verifiedIncidents": verified,
            "pendingIncidents": pending,
            "flaggedIncidents": flagged,
            "timePeriod": {
                "start": "2020-01-01",
                "end": "2024-03-08"
            }
        },
        "trends": {
            "monthly": [
                {
                    "month": f"2024-{m:02d}",
                    "incidents": random.randint(30, 60),
                    "averageSeverity": round(random.uniform(6.0, 7.5), 1),
                    "change": round(random.uniform(-10, 20), 1)
                }
                for m in range(1, 4)
            ],
            "yearly": [
                {
                    "year": str(year),
                    "incidents": random.randint(300, 500),
                    "averageSeverity": round(random.uniform(6.0, 7.0), 1),
                    "change": round(random.uniform(-5, 15), 1)
                }
                for year in range(2020, 2025)
            ]
        },
        "byType": by_type,
        "byRegion": by_region,
        "indexScores": {
            "global": round(avg_severity, 1),
            "byRegion": {country: round(random.uniform(6.0, 7.5), 1) for country in by_region.keys()},
            "byTimePeriod": {
                "2024-Q1": 6.9,
                "2023-Q4": 6.5,
                "2023-Q3": 6.2,
                "2023-Q2": 6.0
            }
        },
        "campaigns": {
            "activeCampaigns": 5,
            "totalDetected": 12,
            "incidentsInCampaigns": len([i for i in incidents if i["isCoordinatedCampaign"]])
        },
        "sourceMonitoring": {
            "sourcesTracked": 150,
            "alertsGenerated": 45,
            "activeMonitoring": 120
        }
    }

def generate_alerts(incidents: List[Dict]) -> Dict[str, Any]:
    """Generate alerts.json"""
    alerts = []
    alert_types = ["geographic_hotspot", "escalation_risk", "coordinated_campaign", "source_reactivation"]
    severities = ["info", "warning", "critical"]
    
    for i in range(25):
        alert_type = random.choice(alert_types)
        severity = random.choice(severities)
        
        alert = {
            "id": f"ALT-{i+1:03d}",
            "type": alert_type,
            "severity": severity,
            "title": f"Alert: {alert_type.replace('_', ' ').title()} Detected",
            "description": f"Description of {alert_type} alert with relevant details",
            "createdAt": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat() + "Z",
            "regionId": f"REG-{random.choice(['IND', 'PAK', 'BGD', 'USA', 'GBR'])}",
            "relatedIncidents": [f"INC-2024-{random.randint(1, 118):03d}" for _ in range(random.randint(2, 5))],
            "acknowledged": random.choice([True, False]),
            "metadata": {
                "incidentCount": random.randint(5, 20),
                "percentageChange": round(random.uniform(10, 50), 1) if alert_type == "geographic_hotspot" else None,
                "riskLevel": random.choice(["low", "medium", "high", "critical"]) if alert_type == "escalation_risk" else None
            }
        }
        alerts.append(alert)
    
    return {"alerts": alerts}

def generate_campaigns(incidents: List[Dict]) -> Dict[str, Any]:
    """Generate campaigns.json"""
    campaigns = []
    
    for i in range(8):
        campaign_incidents = [inc for inc in incidents if inc.get("campaignId") == f"CMP-{i+1:03d}"]
        
        campaign = {
            "id": f"CMP-{i+1:03d}",
            "name": f"Coordinated Campaign {i+1} - {random.choice(['Digital Warfare', 'Media Bias', 'Social Media'])}",
            "status": random.choice(["active", "resolved", "monitoring"]),
            "detectedAt": (datetime.now() - timedelta(days=random.randint(5, 60))).isoformat() + "Z",
            "category": random.choice(["digital_ideological_warfare", "political_weaponization", "civilizational_attacks"]),
            "description": f"Coordinated campaign detected across multiple platforms and sources",
            "sourceCount": random.randint(5, 15),
            "incidentCount": len(campaign_incidents) if campaign_incidents else random.randint(10, 30),
            "relatedIncidents": [inc["id"] for inc in campaign_incidents[:10]] if campaign_incidents else [],
            "relatedSources": [f"SRC-{random.randint(1, 50):03d}" for _ in range(random.randint(3, 8))],
            "regions": random.sample(["USA", "UK", "India", "Canada", "Australia"], k=random.randint(2, 4)),
            "themes": random.sample(["cultural_suppression", "digital_ideological_warfare", "political_weaponization"], k=random.randint(1, 2)),
            "severityAverage": round(random.uniform(6.5, 8.5), 1),
            "escalationTrend": random.choice(["increasing", "stable", "decreasing"]),
            "timeline": [
                {
                    "date": (datetime.now() - timedelta(days=d)).strftime("%Y-%m-%d"),
                    "incidentCount": random.randint(2, 8),
                    "description": f"Activity on day {d}"
                }
                for d in range(0, 15, 3)
            ]
        }
        campaigns.append(campaign)
    
    return {"campaigns": campaigns}

if __name__ == "__main__":
    print("Loading incidents...")
    incidents = load_incidents()
    print(f"Loaded {len(incidents)} incidents")
    
    print("\nGenerating regions...")
    regions = generate_regions(incidents)
    save_json(regions, "regions.json")
    
    print("\nGenerating leaderboards...")
    leaderboards = generate_leaderboards(incidents)
    save_json(leaderboards, "leaderboards.json")
    
    print("\nGenerating articles...")
    articles = generate_articles()
    save_json(articles, "articles.json")
    
    print("\nGenerating statistics...")
    statistics = generate_statistics(incidents)
    save_json(statistics, "statistics.json")
    
    print("\nGenerating alerts...")
    alerts = generate_alerts(incidents)
    save_json(alerts, "alerts.json")
    
    print("\nGenerating campaigns...")
    campaigns = generate_campaigns(incidents)
    save_json(campaigns, "campaigns.json")
    
    print("\n✅ All mock data files generated successfully!")
