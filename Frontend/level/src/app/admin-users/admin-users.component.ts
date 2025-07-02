import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx'; // ✅ For Excel & CSV
import jsPDF from 'jspdf'; // ✅ For PDF
import autoTable from 'jspdf-autotable';


interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  img?: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  selectedRows: string[] = [];
  selectAll = false;
  viewUser: User | null = null; // ✅ Define viewUser property
  currentPage = 1; // ✅ Fix pagination issue
  itemsPerPage = 6;

  constructor(private userService: UserService, public modalService: NgbModal) {} // ✅ Inject modalService

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data.reverse(),
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const currentPageIds = this.currentUsers.map(user => user._id);
    this.selectAll = checked;
    this.selectedRows = checked ? currentPageIds : [];
  }

  toggleSelect(id: string): void {
    this.selectedRows.includes(id) ?
      this.selectedRows = this.selectedRows.filter(i => i !== id) :
      this.selectedRows.push(id);
  }

  openModal(user: User, content: any): void {
    this.viewUser = user;
    this.modalService.open(content);
  }

  totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  deleteUser(userId: string): void {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(userId).subscribe(() => {
      this.fetchUsers();
    });
  }

  deleteSelected(): void {
    if (!confirm('Delete selected users?')) return;
    this.selectedRows.forEach(id => {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      });
    });
    this.selectedRows = [];
    this.selectAll = false;
  }

  get currentUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }
   exportToExcel(): void {
    if (this.selectedRows.length === 0) {
      alert("❌ Please select users to export!");
      return;
    }

    const selectedData = this.users.filter(user => this.selectedRows.includes(user._id));
    const ws = XLSX.utils.json_to_sheet(selectedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  }

  // ✅ Export Selected Users to CSV
  exportToCSV(): void {
    if (this.selectedRows.length === 0) {
      alert("❌ Please select users to export!");
      return;
    }

    const selectedData = this.users.filter(user => this.selectedRows.includes(user._id));
    const ws = XLSX.utils.json_to_sheet(selectedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.csv");
  }

  // ✅ Export Selected Users to PDF
  exportToPDF(): void {
    if (this.selectedRows.length === 0) {
      alert("❌ Please select users to export!");
      return;
    }

    const selectedData = this.users.filter(user => this.selectedRows.includes(user._id));
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Name", "Email", "Phone"]],
      body: selectedData.map(user => [
        user.name,
        user.email,
        user.phone
      ])
    });

    doc.save("users.pdf");
  }
 get paginationNumbers(): number[] {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }


}