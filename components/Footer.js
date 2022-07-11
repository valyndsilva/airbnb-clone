import React from "react";

function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-32 py-14 bg-gray-100 text-gray-600">
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">Support</h5>
          <p>Help Centre</p>
          <p>AirCover</p>
          <p>Safety information</p>
          <p>Supporting people with disabilities</p>
          <p>Cancellation options</p>
          <p>Our COVID-19 Response</p>
          <p>Report a neighbourhood concern</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">Community</h5>
          <p>Airbnb.org: disaster relief housing</p>
          <p>Support Afghan refugees</p>
          <p>Combating discrimination</p>
        </div>

        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">Hosting</h5>
          <p>Try hosting</p>
          <p>AirCover for Hosts</p>
          <p>Explore hosting resources</p>
          <p>Visit our community forum</p>
          <p>How to host responsibly</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">About</h5>
          <p>Newsroom</p>
          <p>Learn about new features</p>
          <p>Letter from our founders</p>
          <p>Careers</p>
          <p>Investors</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
