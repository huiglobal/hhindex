export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Alerts & Notifications</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-4">
          View geographic alerts, escalation warnings, and campaign detections.
        </p>
        <p className="text-gray-600">
          This page will display:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
          <li>Geographic hotspot alerts</li>
          <li>Escalation risk warnings</li>
          <li>Coordinated campaign detections</li>
          <li>Source reactivation alerts</li>
        </ul>
      </div>
    </div>
  );
}
