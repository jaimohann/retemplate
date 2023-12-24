export const Search = {
  columns: [
    {
      name: "id",
      hidden: true,
    },
    {
      name: "title",
      displayName: "Title",
      width: "250px",
    },
    {
      name: "description",
      displayName: "Body",
      type: "numeric",
      width: "250px",
    },
    {
      name: "web_url",
      displayName: "URL",
      search: false,
      width: "250px",
    },
    {
      name: "created_at",
      displayName: "Created At",
      linkedTo: "dob",
      width: "250px",
    },
    {
      name: "node_id",
      hidden: true,
    },
  ],
  serialNo: {
    name: "serial_no",
    title: "#",
    required: true,
    width: "40px",
    align: "center",
  },
  paginated: true,
  initialSort: { name: "created_at", order: "desc" },
  source: "server",
  itemsPerPage: 10,
  actions: {
    name: "actions",
    title: "Actions",
    required: false,
    width: "100px",
    align: "center",
    items: ["modify", "delete", "print"],
  },
};
