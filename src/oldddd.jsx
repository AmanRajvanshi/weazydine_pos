<Sidebar
  id="sidebar12"
  width={245}
  collapsedWidth={245}
  backgroundColor="rgb(255, 255, 255, 1)"
  overflow="scroll"
>
  <Menu>
    {/* dashboard */}
    <MenuItem
      routerLink={<Link to="/" />}
      icon={<i className="iconly-Home icli sidebar_icons"></i>}
    >
      <span>Dashboard</span>
    </MenuItem>
    {/* pos */}
    <MenuItem
      routerLink={<Link to="/pos" />}
      icon={<i className="iconly-Info-Square icli sidebar_icons"></i>}
    >
      <span>POS</span>
    </MenuItem>
    {/* orders */}
    <MenuItem
      routerLink={<Link to="/orderlist" />}
      icon={<i className="iconly-Bag icli sidebar_icons"></i>}
    >
      <span>Orders</span>
    </MenuItem>
    {/* kot */}
    {this.context.role.role === 'owner' ||
      this.context.role.role === 'admin' ||
      this.context.role.role === 'staff' ||
      (this.context.role.role === 'manager' && (
        <MenuItem
          routerLink={<a href="/kot" target="_blank" />}
          icon={<i className="iconly-More-Circle icli sidebar_icons"></i>}
        >
          <span>
            Kitchen Display
            <br /> System
          </span>
        </MenuItem>
      ))}
    {/* catalogue */}
    <SubMenu
      label="Catalogue"
      icon={<i className="iconly-Folder icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/productlist" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Product List</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/categorylist" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Category List</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/productaddons" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Addons List</span>
      </MenuItem>
    </SubMenu>
    {/* inventory */}
    <SubMenu
      label="Inventory"
      icon={<i className="iconly-Folder icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/inventoryproducts" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Raw Materials</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/inventorycategory" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>
          Raw Materials
          <br /> Category
        </span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/stock_purchase" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Stock Purchase</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/releaseStock" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Stock Release</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/productrecipe" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>Product Recipe</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/semifinishedrawmaterialproducts" />}
        icon={<i className="iconly-Folder icli sidebar_icons"></i>}
      >
        <span>
          Semi-Finished <br /> Raw Material Recipe
        </span>
      </MenuItem>

      <MenuItem
        routerLink={<Link to="/supliers" />}
        icon={<i className="iconly-User2 icli sidebar_icons"></i>}
      >
        <span>Suppliers</span>
      </MenuItem>
    </SubMenu>
    {/* reports */}
    <SubMenu
      label="Reports"
      icon={<i className="iconly-Graph icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/salesreport" />}
        icon={<i className="iconly-Graph icli sidebar_icons"></i>}
      >
        <span>Transactions</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/orderreport" />}
        icon={<i className="iconly-Graph icli sidebar_icons"></i>}
      >
        <span>Sales Report</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/productreport" />}
        icon={<i className="iconly-Graph icli sidebar_icons"></i>}
      >
        <span>Product Report</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/orderinvoices" />}
        icon={<i className="iconly-Graph icli sidebar_icons"></i>}
      >
        <span>Order Invoices</span>
      </MenuItem>
    </SubMenu>
    {/* marketing */}
    <SubMenu
      label="Marketing"
      icon={<i className="iconly-Ticket icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/crmcampaigns" />}
        icon={<i className="iconly-Category icli sidebar_icons"></i>}
      >
        <span>Campaigns</span>
      </MenuItem>
    </SubMenu>
    {/* customers */}
    <SubMenu
      label="Customers"
      icon={<i className="iconly-User3 icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/customers" />}
        icon={<i className="iconly-User3 icli sidebar_icons"></i>}
      >
        <span>Customers</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/customerinsights" />}
        icon={<i className="iconly-Filter icli sidebar_icons"></i>}
      >
        <span>
          Customer <br />
          Insights
        </span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/customerfeedback" />}
        icon={<i className="iconly-Heart icli sidebar_icons"></i>}
      >
        <span>
          Customer <br />
          Feedback
        </span>
      </MenuItem>
    </SubMenu>
    {/* offers */}
    <MenuItem
      routerLink={<Link to="/offers" />}
      icon={<i className="iconly-Bag icli sidebar_icons"></i>}
    >
      <span>Offers</span>
    </MenuItem>
    {/* setup */}
    <SubMenu
      label="Setup"
      icon={<i className="iconly-Setting icli sidebar_icons"></i>}
    >
      <MenuItem
        routerLink={<Link to="/dineinlisting" />}
        icon={<i className="iconly-Setting icli sidebar_icons"></i>}
      >
        <span>
          Dine In
          <br />
          Management
        </span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/pickuppoint" />}
        icon={<i className="iconly-Setting icli sidebar_icons"></i>}
      >
        <span>
          Pickup Points
          <br />
          Management
        </span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/kitchens" />}
        icon={<i className="iconly-Setting icli sidebar_icons"></i>}
      >
        <span>
          Kitchens <br />
          Management
        </span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/staffaccounts" />}
        icon={<i className="iconly-User2 icli sidebar_icons"></i>}
      >
        <span>Staff Accounts</span>
      </MenuItem>
      <MenuItem
        routerLink={<Link to="/editprofile" />}
        icon={<i className="iconly-Setting icli sidebar_icons"></i>}
      >
        <span>Store Profile</span>
      </MenuItem>
    </SubMenu>
    {/* learning center */}
    <MenuItem
      routerLink={<Link to="/comingsoon" />}
      icon={<i className="iconly-Video icli sidebar_icons"></i>}
    >
      <span>Learning Center</span>
    </MenuItem>
  </Menu>
</Sidebar>;
