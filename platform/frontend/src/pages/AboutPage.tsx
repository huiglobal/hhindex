export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About & Methodology</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-4">
          Learn about the Hindu Hate Index methodology, taxonomy, and use cases.
        </p>
        <p className="text-gray-600">
          This page will contain detailed information about:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
          <li>Methodology and data collection approach</li>
          <li>8 taxonomy categories</li>
          <li>Source credibility rating system</li>
          <li>Index score calculation</li>
          <li>Use cases and applications</li>
          <li>Data partnership model</li>
        </ul>
      </div>
    </div>
  );
}
