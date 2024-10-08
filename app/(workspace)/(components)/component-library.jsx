"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";

export function ComponentLibrary({ onDragStart }) {
  const [categories, setCategories] = useState([
    {
      name: "Discovery",
      items: [
        {
          name: "Chat Agent",
          description:
            "An AI-powered chat agent that can engage in conversations, answer questions, and provide assistance based on its training.",
        },
        {
          name: "Carrier Comparison Agent",
          description:
            "An agent that compares different carriers based on various factors such as price, delivery time, and service quality to help users make informed decisions.",
        },
        {
          name: "State Coverage Agent",
          description:
            "An agent that provides information on the coverage area of different carriers, helping users understand which carriers operate in which states.",
        },
        {
          name: "Customer Sentiment Analysis Agent",
          description:
            "An agent that analyzes customer feedback and sentiment to provide insights into customer satisfaction and areas for improvement.",
        },
        {
          name: "Shipping Cost Comparison Agent",
          description:
            "An agent that compares shipping costs across different carriers and services to help users find the best rates.",
        },
        {
          name: "Carrier Rate Comparison Agent",
          description:
            "An agent that compares carrier rates for different services and locations to help users find the most cost-effective options.",
        },
      ],
    },
    {
      name: "Finance Agents",
      items: [
        {
          name: "Claims Agent",
          description:
            "Identifies parcels eligible for claims in the database. Gathers necessary documentation and files claims with carriers. Monitors claim status and provides updates (approval, denial, etc.).",
        },
        {
          name: "Receivables Agent",
          description:
            "Tracks outstanding invoices and sends payment reminders. Reconciles incoming payments with the accounting system.",
        },
        {
          name: "Payables Agent",
          description:
            "Monitors vendor invoices and prepares payments. Reconciles invoices with services rendered and flags discrepancies.",
        },
        {
          name: "Reconciliation Agent",
          description:
            "Ensures financial transactions match between internal and external records. Flags any mismatches and suggests corrective actions.",
        },
      ],
    },
    {
      name: "Operations Agents",
      items: [
        {
          name: "Network Monitoring Agent",
          description:
            "Monitors the logistics network, identifying and resolving disruptions. Tracks parcel flow, reroutes trucks when necessary, and ensures timely deliveries.",
        },
        {
          name: "Proactive Logistics Agent",
          description:
            "Predicts potential disruptions (e.g., weather, traffic) and takes preventive actions. Communicates with drivers and partners to resolve real-time logistics issues.",
        },
        {
          name: "Fleet Management Agent",
          description:
            "Tracks truck performance and schedules maintenance. Optimizes fleet efficiency and fuel consumption.",
        },
      ],
    },
    {
      name: "Sales Agents",
      items: [
        {
          name: "Client Acquisition Agent",
          description:
            "Automates the process of identifying and reaching out to potential clients. Tracks lead interactions and suggests follow-ups.",
        },
        {
          name: "Client Relationship Agent",
          description:
            "Manages ongoing relationships with existing customers, handling inquiries and upselling.",
        },
        {
          name: "Pricing Agent",
          description:
            "Analyzes market data and suggests competitive pricing strategies. Provides real-time pricing options to sales teams.",
        },
      ],
    },
    {
      name: "Customer Support Agents",
      items: [
        {
          name: "Customer Query Agent",
          description:
            "Handles customer inquiries in real-time, pulling shipment data from the database. Escalates complex issues to human agents if needed.",
        },
        {
          name: "Claims Resolution Support Agent",
          description:
            "Tracks customer claims, gathers additional information if required, and keeps the customer updated.",
        },
      ],
    },
  ]);

  const [newComponentName, setNewComponentName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddComponent = () => {
    if (newComponentName && selectedCategory) {
      setCategories(
        categories.map((category) =>
          category.name === selectedCategory
            ? {
                ...category,
                items: [
                  ...category.items,
                  { name: newComponentName, description: "" },
                ],
              }
            : category
        )
      );
      setNewComponentName("");
      setSelectedCategory("");
    }
  };

  return (
    <div className="w-64 bg-[#1A8DBE1A] border-r border-border flex flex-col">
      <div className="p-4">
        <Input placeholder="Search components..." />
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="single" collapsible className="w-full">
          {categories.map((category, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="px-4">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="px-4 py-2 hover:bg-accent cursor-move"
                      draggable
                      onDragStart={(e) =>
                        onDragStart(e, {
                          type: category.name.toLowerCase(),
                          name: item.name,
                          description: item.description,
                        })
                      }
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <Input
          placeholder="New component name"
          value={newComponentName}
          onChange={(e) => setNewComponentName(e.target.value)}
          className="mb-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full mb-2 p-2 border rounded bg-[#1E3A5F]"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Button
          onClick={handleAddComponent}
          className="w-full bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add Component
        </Button>
      </div>
    </div>
  );
}
