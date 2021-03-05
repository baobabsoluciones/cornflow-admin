const data = {
  "durations": [
      {
          "duration": 0,
          "job": 1,
          "mode": 1
      },
      {
          "duration": 3,
          "job": 2,
          "mode": 1
      },
      {
          "duration": 4,
          "job": 2,
          "mode": 2
      },
      {
          "duration": 9,
          "job": 2,
          "mode": 3
      },
      {
          "duration": 4,
          "job": 3,
          "mode": 1
      },
      {
          "duration": 5,
          "job": 3,
          "mode": 2
      },
      {
          "duration": 6,
          "job": 3,
          "mode": 3
      },
      {
          "duration": 2,
          "job": 4,
          "mode": 1
      },
      {
          "duration": 7,
          "job": 4,
          "mode": 2
      },
      {
          "duration": 10,
          "job": 4,
          "mode": 3
      },
      {
          "duration": 3,
          "job": 5,
          "mode": 1
      },
      {
          "duration": 4,
          "job": 5,
          "mode": 2
      },
      {
          "duration": 5,
          "job": 5,
          "mode": 3
      },
      {
          "duration": 9,
          "job": 6,
          "mode": 1
      },
      {
          "duration": 9,
          "job": 6,
          "mode": 2
      },
      {
          "duration": 9,
          "job": 6,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 7,
          "mode": 1
      },
      {
          "duration": 3,
          "job": 7,
          "mode": 2
      },
      {
          "duration": 5,
          "job": 7,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 8,
          "mode": 1
      },
      {
          "duration": 3,
          "job": 8,
          "mode": 2
      },
      {
          "duration": 10,
          "job": 8,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 9,
          "mode": 1
      },
      {
          "duration": 3,
          "job": 9,
          "mode": 2
      },
      {
          "duration": 7,
          "job": 9,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 10,
          "mode": 1
      },
      {
          "duration": 2,
          "job": 10,
          "mode": 2
      },
      {
          "duration": 3,
          "job": 10,
          "mode": 3
      },
      {
          "duration": 2,
          "job": 11,
          "mode": 1
      },
      {
          "duration": 2,
          "job": 11,
          "mode": 2
      },
      {
          "duration": 5,
          "job": 11,
          "mode": 3
      },
      {
          "duration": 4,
          "job": 12,
          "mode": 1
      },
      {
          "duration": 9,
          "job": 12,
          "mode": 2
      },
      {
          "duration": 10,
          "job": 12,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 13,
          "mode": 1
      },
      {
          "duration": 1,
          "job": 13,
          "mode": 2
      },
      {
          "duration": 2,
          "job": 13,
          "mode": 3
      },
      {
          "duration": 1,
          "job": 14,
          "mode": 1
      },
      {
          "duration": 7,
          "job": 14,
          "mode": 2
      },
      {
          "duration": 8,
          "job": 14,
          "mode": 3
      },
      {
          "duration": 6,
          "job": 15,
          "mode": 1
      },
      {
          "duration": 7,
          "job": 15,
          "mode": 2
      },
      {
          "duration": 7,
          "job": 15,
          "mode": 3
      },
      {
          "duration": 2,
          "job": 16,
          "mode": 1
      },
      {
          "duration": 4,
          "job": 16,
          "mode": 2
      },
      {
          "duration": 10,
          "job": 16,
          "mode": 3
      },
      {
          "duration": 2,
          "job": 17,
          "mode": 1
      },
      {
          "duration": 3,
          "job": 17,
          "mode": 2
      },
      {
          "duration": 7,
          "job": 17,
          "mode": 3
      },
      {
          "duration": 0,
          "job": 18,
          "mode": 1
      }
  ],
  "jobs": [
      {
          "id": 1,
          "successors": [
              2,
              3,
              4
          ]
      },
      {
          "id": 2,
          "successors": [
              5,
              6,
              9
          ]
      },
      {
          "id": 3,
          "successors": [
              5
          ]
      },
      {
          "id": 4,
          "successors": [
              11,
              15
          ]
      },
      {
          "id": 5,
          "successors": [
              14
          ]
      },
      {
          "id": 6,
          "successors": [
              7,
              8,
              13
          ]
      },
      {
          "id": 7,
          "successors": [
              12
          ]
      },
      {
          "id": 8,
          "successors": [
              15,
              17
          ]
      },
      {
          "id": 9,
          "successors": [
              10,
              16
          ]
      },
      {
          "id": 10,
          "successors": [
              11,
              15
          ]
      },
      {
          "id": 11,
          "successors": [
              17
          ]
      },
      {
          "id": 12,
          "successors": [
              16
          ]
      },
      {
          "id": 13,
          "successors": [
              16
          ]
      },
      {
          "id": 14,
          "successors": [
              17
          ]
      },
      {
          "id": 15,
          "successors": [
              18
          ]
      },
      {
          "id": 16,
          "successors": [
              18
          ]
      },
      {
          "id": 17,
          "successors": [
              18
          ]
      },
      {
          "id": 18,
          "successors": []
      }
  ],
  "needs": [
      {
          "job": 1,
          "mode": 1,
          "need": 0,
          "resource": "R 1"
      },
      {
          "job": 1,
          "mode": 1,
          "need": 0,
          "resource": "R 2"
      },
      {
          "job": 1,
          "mode": 1,
          "need": 0,
          "resource": "N 1"
      },
      {
          "job": 1,
          "mode": 1,
          "need": 0,
          "resource": "N 2"
      },
      {
          "job": 2,
          "mode": 1,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 2,
          "mode": 1,
          "need": 5,
          "resource": "R 2"
      },
      {
          "job": 2,
          "mode": 1,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 2,
          "mode": 1,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 2,
          "mode": 2,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 2,
          "mode": 2,
          "need": 5,
          "resource": "R 2"
      },
      {
          "job": 2,
          "mode": 2,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 2,
          "mode": 2,
          "need": 5,
          "resource": "N 2"
      },
      {
          "job": 2,
          "mode": 3,
          "need": 4,
          "resource": "R 1"
      },
      {
          "job": 2,
          "mode": 3,
          "need": 1,
          "resource": "R 2"
      },
      {
          "job": 2,
          "mode": 3,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 2,
          "mode": 3,
          "need": 2,
          "resource": "N 2"
      },
      {
          "job": 3,
          "mode": 1,
          "need": 7,
          "resource": "R 1"
      },
      {
          "job": 3,
          "mode": 1,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 3,
          "mode": 1,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 3,
          "mode": 1,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 3,
          "mode": 2,
          "need": 5,
          "resource": "R 1"
      },
      {
          "job": 3,
          "mode": 2,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 3,
          "mode": 2,
          "need": 3,
          "resource": "N 1"
      },
      {
          "job": 3,
          "mode": 2,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 3,
          "mode": 3,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 3,
          "mode": 3,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 3,
          "mode": 3,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 3,
          "mode": 3,
          "need": 3,
          "resource": "N 2"
      },
      {
          "job": 4,
          "mode": 1,
          "need": 4,
          "resource": "R 1"
      },
      {
          "job": 4,
          "mode": 1,
          "need": 10,
          "resource": "R 2"
      },
      {
          "job": 4,
          "mode": 1,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 4,
          "mode": 1,
          "need": 9,
          "resource": "N 2"
      },
      {
          "job": 4,
          "mode": 2,
          "need": 3,
          "resource": "R 1"
      },
      {
          "job": 4,
          "mode": 2,
          "need": 5,
          "resource": "R 2"
      },
      {
          "job": 4,
          "mode": 2,
          "need": 5,
          "resource": "N 1"
      },
      {
          "job": 4,
          "mode": 2,
          "need": 9,
          "resource": "N 2"
      },
      {
          "job": 4,
          "mode": 3,
          "need": 2,
          "resource": "R 1"
      },
      {
          "job": 4,
          "mode": 3,
          "need": 1,
          "resource": "R 2"
      },
      {
          "job": 4,
          "mode": 3,
          "need": 5,
          "resource": "N 1"
      },
      {
          "job": 4,
          "mode": 3,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 5,
          "mode": 1,
          "need": 5,
          "resource": "R 1"
      },
      {
          "job": 5,
          "mode": 1,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 5,
          "mode": 1,
          "need": 5,
          "resource": "N 1"
      },
      {
          "job": 5,
          "mode": 1,
          "need": 1,
          "resource": "N 2"
      },
      {
          "job": 5,
          "mode": 2,
          "need": 3,
          "resource": "R 1"
      },
      {
          "job": 5,
          "mode": 2,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 5,
          "mode": 2,
          "need": 3,
          "resource": "N 1"
      },
      {
          "job": 5,
          "mode": 2,
          "need": 1,
          "resource": "N 2"
      },
      {
          "job": 5,
          "mode": 3,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 5,
          "mode": 3,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 5,
          "mode": 3,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 5,
          "mode": 3,
          "need": 1,
          "resource": "N 2"
      },
      {
          "job": 6,
          "mode": 1,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 6,
          "mode": 1,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 6,
          "mode": 1,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 6,
          "mode": 1,
          "need": 10,
          "resource": "N 2"
      },
      {
          "job": 6,
          "mode": 2,
          "need": 5,
          "resource": "R 1"
      },
      {
          "job": 6,
          "mode": 2,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 6,
          "mode": 2,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 6,
          "mode": 2,
          "need": 10,
          "resource": "N 2"
      },
      {
          "job": 6,
          "mode": 3,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 6,
          "mode": 3,
          "need": 5,
          "resource": "R 2"
      },
      {
          "job": 6,
          "mode": 3,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 6,
          "mode": 3,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 7,
          "mode": 1,
          "need": 4,
          "resource": "R 1"
      },
      {
          "job": 7,
          "mode": 1,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 7,
          "mode": 1,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 7,
          "mode": 1,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 7,
          "mode": 2,
          "need": 4,
          "resource": "R 1"
      },
      {
          "job": 7,
          "mode": 2,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 7,
          "mode": 2,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 7,
          "mode": 2,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 7,
          "mode": 3,
          "need": 4,
          "resource": "R 1"
      },
      {
          "job": 7,
          "mode": 3,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 7,
          "mode": 3,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 7,
          "mode": 3,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 8,
          "mode": 1,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 8,
          "mode": 1,
          "need": 9,
          "resource": "R 2"
      },
      {
          "job": 8,
          "mode": 1,
          "need": 8,
          "resource": "N 1"
      },
      {
          "job": 8,
          "mode": 1,
          "need": 5,
          "resource": "N 2"
      },
      {
          "job": 8,
          "mode": 2,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 8,
          "mode": 2,
          "need": 7,
          "resource": "R 2"
      },
      {
          "job": 8,
          "mode": 2,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 8,
          "mode": 2,
          "need": 3,
          "resource": "N 2"
      },
      {
          "job": 8,
          "mode": 3,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 8,
          "mode": 3,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 8,
          "mode": 3,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 8,
          "mode": 3,
          "need": 2,
          "resource": "N 2"
      },
      {
          "job": 9,
          "mode": 1,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 9,
          "mode": 1,
          "need": 9,
          "resource": "R 2"
      },
      {
          "job": 9,
          "mode": 1,
          "need": 8,
          "resource": "N 1"
      },
      {
          "job": 9,
          "mode": 1,
          "need": 4,
          "resource": "N 2"
      },
      {
          "job": 9,
          "mode": 2,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 9,
          "mode": 2,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 9,
          "mode": 2,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 9,
          "mode": 2,
          "need": 4,
          "resource": "N 2"
      },
      {
          "job": 9,
          "mode": 3,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 9,
          "mode": 3,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 9,
          "mode": 3,
          "need": 5,
          "resource": "N 1"
      },
      {
          "job": 9,
          "mode": 3,
          "need": 2,
          "resource": "N 2"
      },
      {
          "job": 10,
          "mode": 1,
          "need": 3,
          "resource": "R 1"
      },
      {
          "job": 10,
          "mode": 1,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 10,
          "mode": 1,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 10,
          "mode": 1,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 10,
          "mode": 2,
          "need": 2,
          "resource": "R 1"
      },
      {
          "job": 10,
          "mode": 2,
          "need": 3,
          "resource": "R 2"
      },
      {
          "job": 10,
          "mode": 2,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 10,
          "mode": 2,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 10,
          "mode": 3,
          "need": 1,
          "resource": "R 1"
      },
      {
          "job": 10,
          "mode": 3,
          "need": 2,
          "resource": "R 2"
      },
      {
          "job": 10,
          "mode": 3,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 10,
          "mode": 3,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 11,
          "mode": 1,
          "need": 9,
          "resource": "R 1"
      },
      {
          "job": 11,
          "mode": 1,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 11,
          "mode": 1,
          "need": 3,
          "resource": "N 1"
      },
      {
          "job": 11,
          "mode": 1,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 11,
          "mode": 2,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 11,
          "mode": 2,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 11,
          "mode": 2,
          "need": 3,
          "resource": "N 1"
      },
      {
          "job": 11,
          "mode": 2,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 11,
          "mode": 3,
          "need": 3,
          "resource": "R 1"
      },
      {
          "job": 11,
          "mode": 3,
          "need": 5,
          "resource": "R 2"
      },
      {
          "job": 11,
          "mode": 3,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 11,
          "mode": 3,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 12,
          "mode": 1,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 12,
          "mode": 1,
          "need": 9,
          "resource": "R 2"
      },
      {
          "job": 12,
          "mode": 1,
          "need": 8,
          "resource": "N 1"
      },
      {
          "job": 12,
          "mode": 1,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 12,
          "mode": 2,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 12,
          "mode": 2,
          "need": 9,
          "resource": "R 2"
      },
      {
          "job": 12,
          "mode": 2,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 12,
          "mode": 2,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 12,
          "mode": 3,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 12,
          "mode": 3,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 12,
          "mode": 3,
          "need": 3,
          "resource": "N 1"
      },
      {
          "job": 12,
          "mode": 3,
          "need": 8,
          "resource": "N 2"
      },
      {
          "job": 13,
          "mode": 1,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 13,
          "mode": 1,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 13,
          "mode": 1,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 13,
          "mode": 1,
          "need": 5,
          "resource": "N 2"
      },
      {
          "job": 13,
          "mode": 2,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 13,
          "mode": 2,
          "need": 8,
          "resource": "R 2"
      },
      {
          "job": 13,
          "mode": 2,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 13,
          "mode": 2,
          "need": 5,
          "resource": "N 2"
      },
      {
          "job": 13,
          "mode": 3,
          "need": 5,
          "resource": "R 1"
      },
      {
          "job": 13,
          "mode": 3,
          "need": 2,
          "resource": "R 2"
      },
      {
          "job": 13,
          "mode": 3,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 13,
          "mode": 3,
          "need": 2,
          "resource": "N 2"
      },
      {
          "job": 14,
          "mode": 1,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 14,
          "mode": 1,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 14,
          "mode": 1,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 14,
          "mode": 1,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 14,
          "mode": 2,
          "need": 7,
          "resource": "R 1"
      },
      {
          "job": 14,
          "mode": 2,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 14,
          "mode": 2,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 14,
          "mode": 2,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 14,
          "mode": 3,
          "need": 5,
          "resource": "R 1"
      },
      {
          "job": 14,
          "mode": 3,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 14,
          "mode": 3,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 14,
          "mode": 3,
          "need": 5,
          "resource": "N 2"
      },
      {
          "job": 15,
          "mode": 1,
          "need": 7,
          "resource": "R 1"
      },
      {
          "job": 15,
          "mode": 1,
          "need": 6,
          "resource": "R 2"
      },
      {
          "job": 15,
          "mode": 1,
          "need": 7,
          "resource": "N 1"
      },
      {
          "job": 15,
          "mode": 1,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 15,
          "mode": 2,
          "need": 7,
          "resource": "R 1"
      },
      {
          "job": 15,
          "mode": 2,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 15,
          "mode": 2,
          "need": 2,
          "resource": "N 1"
      },
      {
          "job": 15,
          "mode": 2,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 15,
          "mode": 3,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 15,
          "mode": 3,
          "need": 1,
          "resource": "R 2"
      },
      {
          "job": 15,
          "mode": 3,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 15,
          "mode": 3,
          "need": 4,
          "resource": "N 2"
      },
      {
          "job": 16,
          "mode": 1,
          "need": 10,
          "resource": "R 1"
      },
      {
          "job": 16,
          "mode": 1,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 16,
          "mode": 1,
          "need": 9,
          "resource": "N 1"
      },
      {
          "job": 16,
          "mode": 1,
          "need": 6,
          "resource": "N 2"
      },
      {
          "job": 16,
          "mode": 2,
          "need": 8,
          "resource": "R 1"
      },
      {
          "job": 16,
          "mode": 2,
          "need": 3,
          "resource": "R 2"
      },
      {
          "job": 16,
          "mode": 2,
          "need": 9,
          "resource": "N 1"
      },
      {
          "job": 16,
          "mode": 2,
          "need": 4,
          "resource": "N 2"
      },
      {
          "job": 16,
          "mode": 3,
          "need": 6,
          "resource": "R 1"
      },
      {
          "job": 16,
          "mode": 3,
          "need": 3,
          "resource": "R 2"
      },
      {
          "job": 16,
          "mode": 3,
          "need": 9,
          "resource": "N 1"
      },
      {
          "job": 16,
          "mode": 3,
          "need": 3,
          "resource": "N 2"
      },
      {
          "job": 17,
          "mode": 1,
          "need": 3,
          "resource": "R 1"
      },
      {
          "job": 17,
          "mode": 1,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 17,
          "mode": 1,
          "need": 8,
          "resource": "N 1"
      },
      {
          "job": 17,
          "mode": 1,
          "need": 9,
          "resource": "N 2"
      },
      {
          "job": 17,
          "mode": 2,
          "need": 2,
          "resource": "R 1"
      },
      {
          "job": 17,
          "mode": 2,
          "need": 4,
          "resource": "R 2"
      },
      {
          "job": 17,
          "mode": 2,
          "need": 6,
          "resource": "N 1"
      },
      {
          "job": 17,
          "mode": 2,
          "need": 7,
          "resource": "N 2"
      },
      {
          "job": 17,
          "mode": 3,
          "need": 2,
          "resource": "R 1"
      },
      {
          "job": 17,
          "mode": 3,
          "need": 3,
          "resource": "R 2"
      },
      {
          "job": 17,
          "mode": 3,
          "need": 4,
          "resource": "N 1"
      },
      {
          "job": 17,
          "mode": 3,
          "need": 4,
          "resource": "N 2"
      },
      {
          "job": 18,
          "mode": 1,
          "need": 0,
          "resource": "R 1"
      },
      {
          "job": 18,
          "mode": 1,
          "need": 0,
          "resource": "R 2"
      },
      {
          "job": 18,
          "mode": 1,
          "need": 0,
          "resource": "N 1"
      },
      {
          "job": 18,
          "mode": 1,
          "need": 0,
          "resource": "N 2"
      }
  ],
  "resources": [
      {
          "available": 21,
          "id": "R 1"
      },
      {
          "available": 24,
          "id": "R 2"
      },
      {
          "available": 99,
          "id": "N 1"
      },
      {
          "available": 106,
          "id": "N 2"
      }
  ]
}

export default { data: data }