git add . //เพิ่มเพื่อ update
git commit -m "--ชื่อที่ตั้ง--" //สร้างชื่อเพื่อ update 
git status //เช็คสถานะที่ทำไป
git push //ผลักเพื่อเข้าสู่ Server

--update 21/12/2023--
แก้หน้า login พยายามทำ แก้ไขสินค้า
--update 22/12/2023

  <div class="row">
      <div class="col-md-7 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Project Status</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Due Date</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <% Object.values(Product).forEach(function(Product, index) { %>
                    <tr>
                      <td><%= index + 1 %></td>
                      <td><%= Product.productname %></td>
                    
                    </tr>
                  <% }) %>
                </tbody>
              </table>