# Bài học Git — ghi lại cho dễ nhớ

> Gom từ các câu hỏi + đúng những lỗi gặp hôm nay (2026-06-04).

---

## 1. Khái niệm nền tảng

| Thứ | Là gì | Ví von |
|---|---|---|
| **Repo** (`git init`) | Một thư mục được git theo dõi. `git init` = tạo repo RỖNG, chưa nối mạng. | Mở 1 cuốn sổ trắng |
| **Commit** | 1 bản lưu (snapshot) các thay đổi, có mã hash (vd `7c7d19d`). | Chụp 1 tấm ảnh trạng thái code |
| **Branch** (nhánh) | 1 dòng commit song song để làm tính năng riêng, không đụng `main`. | Nhánh cây tách ra từ thân |
| **Remote / `origin`** | Địa chỉ kho trên mạng (GitHub). `origin` chỉ là **tên tắt** của URL. | Địa chỉ nhà kho trên mây |
| **GitHub** | Nơi chứa repo online để nhiều người/máy chia sẻ. | Kho trung tâm |

### Lệnh hay dùng
```
git status          # đang có gì thay đổi
git add -A          # đưa thay đổi vào "giỏ" để commit
git commit -m "..." # lưu 1 bản
git log --oneline   # xem lịch sử commit
git branch          # xem các nhánh
git switch <nhánh>  # chuyển nhánh
```

---

## 2. remote / fetch / pull / push (phần bạn hỏi)

`git init` tạo repo **mồ côi, không biết GitHub ở đâu**. Phải khai báo:

```
git remote add origin <url>   # ghi địa chỉ GitHub vào sổ, đặt tên "origin"
```

Sau đó:
| Lệnh | Làm gì | Hướng |
|---|---|---|
| `git fetch origin` | **Tải** lịch sử từ GitHub về (KHÔNG đụng file đang sửa) | GitHub → máy |
| `git pull origin main` | fetch **+ trộn** vào nhánh đang đứng | GitHub → máy (gộp) |
| `git push origin <nhánh>` | **Đẩy** commit của mình lên GitHub | máy → GitHub |

→ Không có `remote add origin` thì không fetch/push gì được.

---

## 3. Luồng làm việc chuẩn (feature branch + Pull Request)

**KHÔNG push thẳng vào `main`.** Thay vào đó:

```
1. git switch -c change/abc      # tạo nhánh mới cho việc đang làm
2. (sửa code) → git add -A → git commit -m "..."
3. git push -u origin change/abc # đẩy NHÁNH lên GitHub
4. Lên GitHub mở Pull Request: base = main, compare = change/abc
5. Xem diff → Merge pull request → main được cập nhật
```

→ Đây chính là kiểu "PR #1", "PR #2" trong repo của bạn.

---

## 4. Các LỖI bạn gặp hôm nay + ý nghĩa

### ❌ Lỗi A — "diverged" / "unrelated histories"
```
Your branch and 'origin/main' have diverged,
and have 2 and 5 different commits each
```
**Nghĩa:** nhánh local và `origin/main` **không chung gốc lịch sử** → git không biết trộn kiểu gì. Push bị từ chối, pull báo "refusing to merge unrelated histories".

**Vì sao xảy ra:** có lệnh `git init` chạy ở thư mục **`webapp/`** (cấp cha) → tạo repo MỚI với commit gốc `0553680 "first commit"`, tách rời hẳn repo GitHub cũ (`TXY_BIO_WEB_FE`, gốc khác). Hai cây lịch sử khác nhau hoàn toàn.

**Bài học:** chỉ `git init` MỘT lần cho 1 dự án. Muốn lấy repo có sẵn từ GitHub thì dùng **`git clone <url>`**, KHÔNG `git init` lại.

### ❌ Lỗi B — untracked files would be overwritten by checkout
```
error: The following untracked working tree files would be overwritten by checkout:
        .idea/compiler.xml
        .idea/misc.xml
Aborting
```
**Nghĩa:** nhánh bạn định switch sang có **tracked** 2 file đó, nhưng trong thư mục đang có 2 file **untracked** cùng tên → git sợ ghi đè mất bản chưa lưu nên dừng.

**Cách xử lý:** xoá/di chuyển file untracked đó (`.idea/` là file IDE tự sinh, bỏ được), hoặc cho `.idea/` vào `.gitignore`. Rồi switch lại.

**Bài học:** file IDE (`.idea/`), `node_modules/`, `dist/` nên cho vào **`.gitignore`** để git bỏ qua, tránh va chạm.

### ❌ Lỗi C — push bị từ chối (non-fast-forward)
**Nghĩa:** GitHub có commit mà local chưa có → git chặn để bạn không ghi đè mất. Cách đúng: `git pull` về trộn trước, rồi push. (KHÔNG dùng `--force` bừa, dễ mất lịch sử của người khác.)

---

## 5. Tình huống hôm nay & cách sửa (Path A)

- **Vấn đề:** repo bị `git init` nhầm ở `webapp/` → tách rời GitHub.
- **Code KHÔNG mất** — còn nguyên trong file + đã commit local (làm backup).
- **Sửa:** dựng lại repo đúng cấp `frontend/`, nối lại `origin`, đưa thay đổi vào nhánh mới → push → PR:
```
cd frontend
git init
git remote add origin https://github.com/Truong20gacha/TXY_BIO_WEB_FE.git
git fetch origin
git reset --mixed origin/main     # giữ nguyên file, chỉ chỉnh "đang ở commit nào"
git switch -c change/about_us
git add -A && git commit -m "..."
git push -u origin change/about_us   # ← bước này TỰ làm, rồi mở PR
```

---

## 6. Ghi nhớ nhanh
- `git init` 1 lần / dự án. Lấy repo có sẵn → `git clone`.
- Luôn làm trên **nhánh riêng**, vào `main` qua **Pull Request**.
- `--mixed` (mặc định của `reset`) **không xoá file**; `--hard` thì XOÁ — cẩn thận.
- File rác (IDE, node_modules, dist, pdf nặng) → cho vào `.gitignore`.
- Kẹt thì chạy `git status` đọc kỹ — git thường nói luôn cách sửa ở dòng gợi ý.
