import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-center py-7 px-4 bg-[#262626] text-[#c0c0c0] font-light text-sm mt-12 border-t border-white/5">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-semibold text-white tracking-wide">
          <span className="text-[#ff004f]">M</span>oksha Mehta
        </p>
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#ababab]">
          <span>Copyright © 2025 Moksha. Made with</span>
          <Heart size={14} className="text-[#ff004f] fill-[#ff004f] inline-block" />
          <span>by Moksha Mehta</span>
        </p>
        <p className="text-xs text-[#ababab]">
          B.Tech CSE • CGPA: 7.5
        </p>
      </div>
    </footer>
  );
}
