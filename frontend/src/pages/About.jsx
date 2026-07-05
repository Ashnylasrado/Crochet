import React from "react";

export default function About() {
  return (
    <div className="wrap about-page">
      <h2>About Crochet Shop</h2>
      <p>
        Every piece in this shop is handmade, stitch by stitch. What started as a small
        hobby has grown into a little shop full of cozy hats, huggable amigurumi,
        cheerful home decor, and everyday bags — all made with care.
      </p>

      <h2>Meet the Founder</h2>
      <div className="founder-card">
        <img src="/product-images/photo.png" alt="Ashny Lasrado, founder of Crochet Shop" className="founder-photo" />
        <div className="founder-info">
          <h3 className="founder-name">Ashny Lasrado</h3>
          <p className="founder-location">📍 Toronto, Canada M5A 0B9</p>
          <p className="founder-note">Thanks for stopping by!</p>
        </div>
      </div>
    </div>
  );
}