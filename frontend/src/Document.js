import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import './index.css'; // Assuming Tailwind is set up

// Collapsible Section Component
const CollapsibleSection = ({ title, children, searchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Safely extract text content for filtering
  const getTextContent = (node) => {
    if (typeof node === 'string' || typeof node === 'number') return node.toString().toLowerCase();
    if (Array.isArray(node)) return node.map(getTextContent).join(' ');
    if (node?.props?.children) return getTextContent(node.props.children);
    return '';
  };

  const contentText = getTextContent(children).toLowerCase();
  const matchesSearch = searchQuery ? contentText.includes(searchQuery.toLowerCase()) : true;

  if (!matchesSearch) return null;

  return (
    <div className="mb-6 bg-gray-900/60 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700 transition-all hover:shadow-2xl">
      <button
        className="w-full p-4 flex justify-between items-center text-left text-lg font-semibold text-red-400 hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-${title.replace(/\s/g, '-')}`}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-gray-300" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-300" />
        )}
      </button>
      {isOpen && (
        <div id={`section-${title.replace(/\s/g, '-')}`} className="p-4 text-gray-200 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

// Main Documentation Component
const Vision11Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allExpanded, setAllExpanded] = useState(false);

  // Toggle all sections safely
  const toggleAllSections = (expand) => {
    setAllExpanded(expand);
    const buttons = document.querySelectorAll('.collapsible-section button');
    buttons.forEach((btn) => {
      if (btn.getAttribute('aria-expanded') !== String(expand)) {
        btn.click();
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Search and Toggle Buttons */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Vision11 Analytics Dashboard Documentation</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-1/2">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search documentation"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => toggleAllSections(true)}
              >
                Expand All
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => toggleAllSections(false)}
              >
                Collapse All
              </button>
            </div>
          </div>
        </header>

        {/* Quick Start */}
        <section className="mb-12 bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Start</h2>
          <p className="text-gray-200 leading-relaxed">
            The Vision11 Analytics Dashboard helps administrators monitor user behavior, financials, and team preferences. To begin:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Select a user from the dropdown to view their data.</li>
            <li>Use tabs (Journey, Analytics, Financial, Teams) to explore metrics.</li>
            <li>Apply filters for specific actions or date ranges.</li>
            <li>Export insights as CSV for offline analysis.</li>
          </ul>
        </section>



        {/* Journey Tab */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Journey Tab</h2>
          <p className="text-gray-200 mb-6">
            Displays a user’s interactions, including their activity timeline, profile, and insights for retention strategies.
          </p>
          <CollapsibleSection title="1.1 User Details Card" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Shows key user attributes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>User ID:</strong> Unique identifier (e.g., U001).</li>
              <li><strong>Username:</strong> Display name (e.g., cricketFan123).</li>
              <li><strong>Email:</strong> Registered email.</li>
              <li><strong>Registration Date:</strong> Join date (e.g., 2024-12-01).</li>
              <li><strong>Total Deposits:</strong> Sum of deposits (e.g., $410.50).</li>
              <li><strong>Total Withdrawals:</strong> Sum of withdrawals (e.g., $120.00).</li>
              <li><strong>Balance:</strong> Current funds (e.g., $169.75).</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enables personalized outreach.</li>
              <li>Assesses loyalty via tenure.</li>
              <li>Identifies high-value or at-risk users.</li>
              <li>Low balance or high withdrawals signal churn risk.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="1.2 User Journey Timeline" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Scrollable timeline of user actions (e.g., login, deposit) with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Timestamp:</strong> Date/time (e.g., 2025-06-15T10:00:00Z).</li>
              <li><strong>Action:</strong> Type (e.g., login, placed_bet).</li>
              <li><strong>Details:</strong> Amount, contest ID, or rank.</li>
              <li><strong>Styling:</strong> Color-coded (e.g., green for deposits).</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tracks engagement patterns.</li>
              <li>Identifies action relationships.</li>
              <li>Highlights drop-off risks.</li>
              <li>Triggers targeted interventions.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="1.3 Filter Actions Dropdown" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Filters timeline by action type (e.g., login, deposit).</p>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Isolates specific behaviors.</li>
              <li>Reduces timeline noise.</li>
              <li>Highlights contest engagement.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="1.4 Insights (InsightsCards Component)" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Grid of cards with insights:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Recommendation:</strong> Suggestions (e.g., offer promotions).</li>
              <li><strong>Net Contribution:</strong> Deposits minus withdrawals.</li>
              <li><strong>Session Time:</strong> Duration (e.g., 120 min).</li>
              <li><strong>Bet Count & Average:</strong> Bets and value (e.g., 2 at $12.50).</li>
              <li><strong>Win Rate:</strong> Wins percentage (e.g., 50%).</li>
              <li><strong>Last Login:</strong> Time since login (e.g., 24h).</li>
              <li><strong>Peak Activity Hour:</strong> Most active hour (e.g., 18:00).</li>
              <li><strong>Favorite Teams:</strong> Preferred teams.</li>
              <li><strong>Referrals:</strong> Referred users (e.g., 1).</li>
              <li><strong>Churn Risk:</strong> Retention suggestions.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Guides retention strategies.</li>
              <li>Prioritizes high-value users.</li>
              <li>Measures engagement depth.</li>
              <li>Optimizes promotion timing.</li>
            </ul>
          </CollapsibleSection>
        </section>

        {/* Analytics Tab */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Analytics Tab</h2>
          <p className="text-gray-200 mb-6">
            Provides predictive analytics and metrics for churn risk, betting outcomes, and user value.
          </p>
          <CollapsibleSection title="2.1 Churn Risk Comparison" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Bar chart of churn risk for all users (red: >50%, teal: ≤50%).</p>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identifies at-risk users.</li>
              <li>Contextualizes user’s risk.</li>
              <li>Reveals systemic issues.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="2.2 Selected User Churn Risk" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Gauge chart of user’s churn risk (green: low, red: high).</p>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visualizes churn likelihood.</li>
              <li>Triggers immediate strategies.</li>
              <li>Confirms engagement success.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="2.3 Win/Loss Ratio" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Pie chart of wins (teal) vs. losses (red).</p>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Influences satisfaction.</li>
              <li>Encourages participation.</li>
              <li>Reveals risk-taking tendencies.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="2.4 Predictions Section" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Inputs and stat cards for predictions:</p>
            <p className="font-semibold mt-2">Inputs:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Engagement Score:</strong> 0-1 (default: 0.7).</li>
              <li><strong>Game Time:</strong> Minutes (default: 120).</li>
              <li><strong>Average Spend:</strong> $ (default: 50).</li>
            </ul>
            <p className="font-semibold mt-2">Stats:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Churn Risk:</strong> Leaving probability.</li>
              <li><strong>Drop-Off Risk:</strong> Reduced engagement.</li>
              <li><strong>Spike Likelihood:</strong> High activity chance.</li>
              <li><strong>Game Time Engagement:</strong> Loyalty level.</li>
              <li><strong>LTV:</strong> Estimated revenue.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enables scenario testing.</li>
              <li>Guides retention and promotion.</li>
              <li>Prioritizes high-value users.</li>
            </ul>
          </CollapsibleSection>
        </section>

        {/* Financial Tab */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Financial Tab</h2>
          <p className="text-gray-200 mb-6">
            Analyzes user financials to optimize revenue and engagement.
          </p>
          <CollapsibleSection title="3.1 Financial Trends" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Line chart with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Deposits:</strong> Daily (teal).</li>
              <li><strong>Withdrawals:</strong> Daily (red).</li>
              <li><strong>Net Activity:</strong> Deposits minus withdrawals.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reveals financial patterns.</li>
              <li>Assesses financial value.</li>
              <li>Flags churn risk.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="3.2 Transaction Averages" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Stats for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Average Deposit:</strong> Mean deposit.</li>
              <li><strong>Average Withdrawal:</strong> Mean withdrawal.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identifies transaction behavior.</li>
              <li>Informs bonus strategies.</li>
              <li>Tailors offers.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="3.3 Betting Spend vs. Balance" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Pie chart of:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Betting Spend:</strong> Total bets.</li>
              <li><strong>Balance:</strong> Current funds.</li>
              <li><strong>Spend Ratio:</strong> Spend percentage.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Shows risk appetite.</li>
              <li>Flags depletion risk.</li>
              <li>Monitors betting intensity.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="3.4 Transaction Frequency" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Stats for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Deposits/Month:</strong> Average deposits.</li>
              <li><strong>Withdrawals/Month:</strong> Average withdrawals.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Indicates funding activity.</li>
              <li>Signals depletion risks.</li>
              <li>Optimizes bonus timing.</li>
            </ul>
          </CollapsibleSection>
          <CollapsibleSection title="3.5 Financial Insights (InsightsCards Component)" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Cards for:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Total Deposits:</strong> Sum and average.</li>
              <li><strong>Total Withdrawals:</strong> Sum and average.</li>
              <li><strong>Betting Spend:</strong> Total and ratio.</li>
              <li><strong>Net Contribution:</strong> Financial impact.</li>
              <li><strong>Balance Status:</strong> Health assessment.</li>
            </ul>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Highlights high-value users.</li>
              <li>Tracks fund outflows.</li>
              <li>Informs revenue strategies.</li>
              <li>Prevents churn.</li>
            </ul>
          </CollapsibleSection>
        </section>

        {/* Teams Tab */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Teams Tab</h2>
          <p className="text-gray-200 mb-6">
            Visualizes team preferences for marketing and contest planning.
          </p>
          <CollapsibleSection title="4.1 Team Popularity" searchQuery={searchQuery}>
            <p><strong>Overview:</strong> Bar chart of users per team.</p>
            <p className="mt-4"><strong>Purpose:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Guides promotions and sponsorships.</li>
              <li>Boosts contest participation.</li>
              <li>Enables personalized content.</li>
              <li>Informs expansion strategies.</li>
            </ul>
          </CollapsibleSection>
        </section>
      </div>
    </div>
  );
};

export default Vision11Documentation;