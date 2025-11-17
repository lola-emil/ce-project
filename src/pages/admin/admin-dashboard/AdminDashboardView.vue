<script setup lang="ts">


import StatSection from './components/StatSection.vue';
import ChartSection from './components/ChartSection.vue';
import DataTable from './components/DataTable.vue';


interface TableData {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
}

const tableData: TableData[] = [
  {
    id: 1,
    header: "Revenue Report",
    type: "Financial",
    status: "Completed",
    target: "Q1",
    limit: "$50,000",
    reviewer: "Alice Johnson"
  },
  {
    id: 2,
    header: "User Growth",
    type: "Analytics",
    status: "In Progress",
    target: "10k Users",
    limit: "N/A",
    reviewer: "Bob Smith"
  },
  {
    id: 3,
    header: "Server Load",
    type: "Monitoring",
    status: "Warning",
    target: "75%",
    limit: "80%",
    reviewer: "Charlie Davis"
  },
  {
    id: 4,
    header: "Bug Triage",
    type: "QA",
    status: "Pending",
    target: "20 Bugs",
    limit: "25 Bugs",
    reviewer: "Dana Miller"
  },
  {
    id: 5,
    header: "Marketing Spend",
    type: "Financial",
    status: "Completed",
    target: "$10,000",
    limit: "$12,000",
    reviewer: "Evan Lee"
  },
  {
    id: 6,
    header: "Page Performance",
    type: "Analytics",
    status: "In Progress",
    target: "2s Load Time",
    limit: "3s",
    reviewer: "Fiona Clark"
  },
  {
    id: 7,
    header: "Security Audit",
    type: "Security",
    status: "Completed",
    target: "All Checks",
    limit: "N/A",
    reviewer: "George Turner"
  },
  {
    id: 8,
    header: "Customer Feedback",
    type: "Support",
    status: "Pending",
    target: "200 Responses",
    limit: "250 Responses",
    reviewer: "Hannah Brooks"
  },
  {
    id: 9,
    header: "Feature Rollout",
    type: "Development",
    status: "In Progress",
    target: "Phase 2",
    limit: "Phase 3",
    reviewer: "Ian Carter"
  },
  {
    id: 10,
    header: "Inventory Check",
    type: "Operations",
    status: "Completed",
    target: "100 Units",
    limit: "120 Units",
    reviewer: "Julia Adams"
  },
  { id: 11, header: "Client List", type: "Client", status: "Active", target: "20", limit: "50", reviewer: "Admin" },
  { id: 12, header: "Worker Profiles", type: "Worker", status: "Active", target: "40", limit: "100", reviewer: "Supervisor" },
  { id: 13, header: "Job Queue", type: "Job", status: "Open", target: "10", limit: "30", reviewer: "Manager" },
  { id: 14, header: "Pending Clients", type: "Client", status: "Pending", target: "5", limit: "20", reviewer: "Admin" },
  { id: 15, header: "Inactive Workers", type: "Worker", status: "Inactive", target: "3", limit: "10", reviewer: "Supervisor" },
  { id: 16, header: "Completed Jobs", type: "Job", status: "Closed", target: "25", limit: "50", reviewer: "Manager" },
  { id: 17, header: "Client Audits", type: "Client", status: "Review", target: "7", limit: "15", reviewer: "Compliance" },
  { id: 18, header: "Worker Compliance", type: "Worker", status: "Review", target: "12", limit: "25", reviewer: "Compliance" },
  { id: 19, header: "Job Scheduling", type: "Job", status: "Active", target: "18", limit: "40", reviewer: "Scheduler" },
  { id: 20, header: "High Priority Jobs", type: "Job", status: "Urgent", target: "4", limit: "10", reviewer: "Manager" }
];


</script>

<template>


  <main class="mt-5">
    <div class="container mx-auto px-5 md:px-0">
      <section>
        <StatSection />
      </section>
      <section class="mt-5">
        <ChartSection />
      </section>

      <section class="mt-5">
        <DataTable :data="tableData" />
      </section>
    </div>
  </main>

  <br>
  <br>
</template>
