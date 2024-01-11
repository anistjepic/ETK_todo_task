import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-board-header',
    standalone: true,
    imports: [MatButtonModule, NgFor, NgIf, FormsModule],
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.css'
})
export class BoardHeaderComponent implements OnInit {
    @Input() boardName!: string;
    showCreateForm: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {

    }

    onClickGoBackToMainPage() {
        console.log('Clicked application name:');
        this.router.navigate(['/boards']);
    }
}