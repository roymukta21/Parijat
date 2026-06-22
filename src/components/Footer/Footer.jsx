import { Link } from 'react-router-dom'
import { RiInstagramLine, RiPinterestLine, RiFacebookLine, RiTwitterXLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="bg-dark text-muted pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="font-cormorant text-3xl font-light tracking-[0.3em] text-beige mb-4">Parijat</div>
            <p className="text-xs leading-loose text-[#5a5248] max-w-[200px]">Modern luxury fashion for the woman who lives with intention and dresses with grace.</p>
            <div className="flex gap-4 mt-6">
              <RiInstagramLine className="text-lg text-[#4a4038] hover:text-muted cursor-pointer transition-colors" />
              <RiPinterestLine className="text-lg text-[#4a4038] hover:text-muted cursor-pointer transition-colors" />
              <RiFacebookLine className="text-lg text-[#4a4038] hover:text-muted cursor-pointer transition-colors" />
              <RiTwitterXLine className="text-lg text-[#4a4038] hover:text-muted cursor-pointer transition-colors" />
            </div>
          </div>
          {[
            ['Collections', ['New Arrivals','Dresses','Tops & Blouses','Bags','Footwear','Accessories']],
            ['Company', ['About Us','Sustainability','Designers','Press','Careers']],
            ['Support', ['Shipping & Returns','Size Guide','Care Guide','Contact Us','FAQs']],
          ].map(([heading, links]) => (
            <div key={heading}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#5a5248] mb-5">{heading}</div>
              <div className="flex flex-col gap-3">
                {links.map(l => <Link key={l} to="/" className="text-[13px] text-[#6a6058] hover:text-muted transition-colors">{l}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#2D2520] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-[#4a4038]">© 2025 Parijat. All rights reserved.</p>
          <p className="text-[11px] text-[#4a4038]">Crafted with elegance.</p>
        </div>
      </div>
    </footer>
  )
}
