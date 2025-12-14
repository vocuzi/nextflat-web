"use client";

import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import Image from "next/image";
import { NfBtn } from "../generic/buttons/Btn";

export default function PromoteNextFlatForOwners() {
  return (
    <section className="border rounded-lg m-3 flex flex-col items-start md:flex-row gap-6 md:gap-12 p-6 md:p-12 items-center justify-center bg-white">
      <div className="flex items-center justify-center">
        <Image
          src={"/illustrations/image-w3tfkQ210upUMSotrYRu5dJExwvno4.png"}
          alt="Masthead Image"
          width={700}
          height={700}
          className="w-72 md:w-240 rounded-lg"
        />
      </div>
      <div className="text-left">
        <div
          className="bg-slate-900 text-white text-sm rounded-full px-3 py-1 inline-flex items-center gap-2 mb-4"
        >
          <BadgeCheckIcon size={18} className="text-green-300"/>
          For Landlords & Brokers
        </div>
        <h2 className="text-3xl md:text-3xl font-semibold text-slate-900">
          Find Tenants & Flatmates Faster with{" "}
          <span className="text-green-600">NextFlat</span>
        </h2>

        <p className="mt-4 text-lg text-slate-700 leading-relaxed">
          Post your available flat, room or PG on NextFlat and we&apos;ll help you reach
          our <span className="font-semibold"> 10,000+ active users</span> on priority.
          We promote your listing across multiple social media websites and portals to help
          you find the right tenant or flatmate sooner than you know it.
        </p>

        {/* Bullet Points */}
        <ul className="mt-6 text-left inline-block space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✔</span>
            Reach a growing audience of renters actively searching daily
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✔</span>
            Your listing gets shared across Facebook, Telegram, and our in-house
            channels
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✔</span>
            Simple posting - takes less than 2 minutes
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl">✔</span>
            No brokers involved - reach tenants directly
          </li>
        </ul>

        {/* CTA Button */}
        <div className="mt-8">
          <NfBtn href="/post/create" variant={'dark'} size="md" icon={<ArrowRight size={20} />} >
            Post Your Flat Now
          </NfBtn>
        </div>
        <p className="mt-3 text-slate-500 text-sm">
          Completely free to post. No hidden charges.
        </p>
      </div>
    </section>
  );
}
