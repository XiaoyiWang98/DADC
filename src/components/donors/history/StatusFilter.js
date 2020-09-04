import React from "react";
import { Dropdown, Menu } from "antd";
import { ALL, COMPLETED, PENDING, SCHEDULED } from "./constants";
import { DownOutlined } from "@ant-design/icons";

export const DonorStatusFilter = ({ filterBy, ...props }) => {
  const onClick = ({ key }) => {
    filterBy(key);
  };

  const status_menu = (
    <Menu className="history-status-menu" onClick={onClick}>
      <Menu.Item key={PENDING}>Pending</Menu.Item>
      <Menu.Item key={SCHEDULED}>Scheduled</Menu.Item>
      <Menu.Item key={COMPLETED}>Completed</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={ALL}>All</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown overlay={status_menu} trigger={["click"]}>
        <p
          className="history-status-filter"
          onClick={(e) => e.preventDefault()}
        >
          Select Pickup Status <DownOutlined />
        </p>
      </Dropdown>
    </div>
  );
};

export default DonorStatusFilter;
