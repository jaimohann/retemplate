export const search = {
  columns: [
    {
      name: "id",
      hidden: true,
    },
    {
      name: "email",
      displayName: "E-Mail",
      width: "250px",
    },
    {
      name: "name",
      displayName: "Name",
      width: "250px",
    },
    {
      name: "role",
      displayName: "Role",
      search: false,
      width: "250px",
    }
    
  ],
  serialNo: {
    name: "serial_no",
    title: "#",
    required: true,
    width: "40px",
    align: "center",
  },
  paginated: true,
  initialSort: { name: "name", order: "asc" },
  source: "server",
  endPoint:"users",
  itemsPerPage: 10,
  actions: {
    name: "actions",
    title: "Actions",
    required: true,
    width: "100px",
    align: "center",
    items: ["modify", "delete", "print"],
  },
};
